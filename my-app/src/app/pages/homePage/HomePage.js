import React from "react";
import TaskItem from "./components/TaskItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import { mainStyles } from "./styles/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CircleButton from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Formik, Field, Form } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";
import uuid from "react-uuid";

// schemas for validation
import { validationAddNewTask } from "./components/Schemas";

// to do lists array
import { toDoLists } from "./constants/toDoLists";

const HomePage = () => {
  //styles
  const classes = mainStyles();

  //   react hooks
  const [showAddTask, setShowAddTask] = React.useState(false);
  const [toDo, setToDo] = React.useState([...toDoLists]);
  const [valueOfAddTaskToNext, setValueOfAddTaskToNext] = React.useState();

  //   hanlde show add task
  const handleShowAddTask = () => {
    setShowAddTask(true);
  };

  //   handle hide add tasl
  const handleHideAddTask = () => {
    setShowAddTask(false);
  };

  //    handle add new task
  const handleAddNewTask = (taskName, actions) => {
    // update task and set to react hook
    setToDo([
      ...toDo,
      {
        id: uuid(),
        taskName: taskName,
        subTasks: [],
        addNewTaskToNext: false,
        editAble: false,
      },
    ]);

    // remove  snipper from button
    actions.isSubmitting(false);
  };

  //    handle change when add new task to next of selected task
  const hanldeChangeAddNewTaskToNext = (e, id, index) => {
    setValueOfAddTaskToNext(e.target.value);
    let selectedTask = toDo.filter((item, i) => item.id === id);

    //   set updated sub tasks to react hook
    if (e.target.value) {
      setToDo([
        ...toDo,
        ...toDo.splice(index + 1, 0, {
          id: uuid(),
          taskName: e.target.value,
          subTasks: [],
          addNewTaskToNext: false,
          editAble: false,
        }),
      ]);
      const setAddNewTaskToNextFalse = toDo.map((item) => {
        if (selectedTask[0].id === item.id)
          return {
            ...item,
            id: item.id,
            taskName: item.taskName,
            subTasks: item.subTasks,
            addNewTaskToNext: false,
            editAble: item.editAble,
          };
        else return item;
      });
      setToDo(setAddNewTaskToNextFalse);
    }
  };

  //    hanlde on key press after clicked each task
  const hanldeOnKeyPress = (taskName, e, id, index) => {
    let previousTaskId = toDo.filter((item, i) => index - 1 === i);
    let selectedTask = toDo.filter((item, i) => item.id === id);

    //  handle when key is enter
    if (e.key === "Enter") {
      const setAddNewTaskToNext = toDo.map((item) => {
        if (selectedTask[0].id === item.id)
          return {
            ...item,
            id: item.id,
            taskName: item.taskName,
            subTasks: item.subTasks,
            addNewTaskToNext: true,
            editAble: item.editAble,
          };
        else return item;
      });

      setToDo(setAddNewTaskToNext);
    }

    // handle when key is tab
    if (e.key === "Tab" && index !== 0) {
      //   convert main task to above sub task
      const updateSubTasks = toDo.map((item) => {
        if (previousTaskId[0].id === item.id)
          return [
            ...item.subTasks,
            {
              id: uuid(),
              taskName: selectedTask[0].taskName,
              addNewTaskToNext: selectedTask[0].addNewTaskToNext,
              editAble: selectedTask[0].editAble,
            },
          ];
        else return [...item.subTasks];
      });

      //   set updated sub tasks to react hook
      setToDo(
        toDo
          .map((item, index) => {
            return {
              ...item,
              subTasks: [...updateSubTasks[index]],
            };
          })
          .filter((item, i) => i !== index)
      );
    }
  };

  const handleTaskEditButton = (id, index) => {
    let selectedTask = toDo.filter((item, i) => item.id === id);
    const setEditableTask = toDo.map((item) => {
      if (selectedTask[0].id === item.id)
        return {
          ...item,
          id: item.id,
          taskName: item.taskName,
          subTasks: item.subTasks,
          addNewTaskToNext: item.addNewTaskToNext,
          editAble: true,
        };
      else return item;
    });
    setToDo(setEditableTask);
  };

  const hanldeChangeTaskEdit = (e, id) => {
    setValueOfAddTaskToNext(e.target.value);
    let selectedTask = toDo.filter((item) => item.id === id);

    //   set updated sub tasks to react hook
    if (e.target.value) {
      const updateEditedTask = toDo.map((item) => {
        if (selectedTask[0].id === item.id)
          return {
            ...item,
            id: item.id,
            taskName: e.target.value,
            subTasks: item.subTasks,
            addNewTaskToNext: item.addNewTaskToNext,
            editAble: false,
          };
        else return item;
      });
      setToDo(updateEditedTask);
    }
  };
  
  
  return (
    <>
      <Paper className={classes.paper}>
        <p>Please click on each parent task and press (Enter) or (Tab) key.</p>
      </Paper>
      {/*   todo list card  */}
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                My To Do List
              </ListSubheader>
            }
            className={classes.root}
          >
            {toDo.map((item, index) => (
              <TaskItem
                id={item.id}
                taskName={item.taskName}
                subTasks={item.subTasks}
                addNewTaskToNext={item.addNewTaskToNext}
                editAble={item.editAble}
                key={item.id}
                hanldeOnKeyPress={hanldeOnKeyPress}
                index={index}
                hanldeChangeAddNewTaskToNext={hanldeChangeAddNewTaskToNext}
                handleTaskEditButton={handleTaskEditButton}
                hanldeChangeTaskEdit={hanldeChangeTaskEdit}
              />
            ))}
          </List>

          {showAddTask ? (
            ""
          ) : (
            <CircleButton
              className={classes.circleButton}
              onClick={handleShowAddTask}
            >
              <AddIcon />
            </CircleButton>
          )}
        </Grid>
      </Paper>

      {/* add new task card  */}
      {showAddTask ? (
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <IconButton
                className={classes.iconButton}
                onClick={handleHideAddTask}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6" align={"right"}>
                Add New Task
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Formik
                initialValues={{
                  taskName: "",
                }}
                onSubmit={async (values, actions) => {
                  await new Promise((resolve) => setTimeout(resolve, 2000));
                  handleAddNewTask(values.taskName, actions);
                }}
                validationSchema={validationAddNewTask}
              >
                {({ isSubmitting, isValid, errors, touched }) => (
                  <Form>
                    <Field
                      name="taskName"
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          helperText={
                            errors.taskName &&
                            touched.taskName &&
                            errors.taskName
                          }
                          error={isValid ? false : true}
                          label="task name"
                          {...field}
                        />
                      )}
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!isValid}
                      fullWidth
                      style={{ marginTop: "20px" }}
                    >
                      {isSubmitting && (
                        <CircularProgress
                          style={{ marginRight: "10px" }}
                          color={"#fff"}
                          size={14}
                        />
                      )}
                      <span>Add</span>
                    </Button>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        ""
      )}
    </>
  );
};

export default HomePage;
