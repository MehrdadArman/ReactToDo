import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/EditOutlined";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Collapse from "@material-ui/core/Collapse";

import List from "@material-ui/core/List";
import { mainStyles } from "../styles/styles";

const TaskItem = ({
  id,
  taskName,
  subTasks,
  addNewTaskToNext,
  editAble,
  hanldeOnKeyPress,
  index,
  hanldeChangeAddNewTaskToNext,
  handleTaskEditButton,
  hanldeChangeTaskEdit,
}) => {
  const classes = mainStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <>
      {!editAble ? (
        <div className={classes.listWrapper}>
          <ListItem
            button
            onKeyDown={(e) => hanldeOnKeyPress(taskName, e, id, index)}
            onMouseOver={(e) => hanldeOnKeyPress(taskName, e, id, index)}
            // onClick={handleClick}
            className={classes.list}
          >
            <ListItemText primary={taskName} />

            {Array.isArray(subTasks) ? (
              <>
                <EditIcon
                  onClick={() => handleTaskEditButton(id, index)}
                  fontSize={"small"}
                  className={classes.editButton}
                />
              </>
            ) : (
              ""
            )}
          </ListItem>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {subTasks.map((item) => (
                <ListItem button className={classes.nested} key={item.id}>
                  <ListItemIcon>-</ListItemIcon>
                  <ListItemText primary={item.taskName} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ) : (
        <div className={classes.listWrapper}>
          <ListItem button>
            <ListItemIcon>
              <FiberManualRecord fontSize={"small"} />
            </ListItemIcon>
            <input
              type="text"
              onBlur={(e) => hanldeChangeTaskEdit(e, id, index)}
              className={classes.inputOfAddNewTask}
              placeholder="Please Write Your New Task"
            />
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {subTasks.map((item) => (
                <ListItem button className={classes.nested} key={item.id}>
                  <ListItemIcon>-</ListItemIcon>
                  <ListItemText primary={item.taskName} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      )}

      <div className={classes.listWrapper}>
        {addNewTaskToNext ? (
          <ListItem button>
            <ListItemIcon>
              <FiberManualRecord fontSize={"small"} />
            </ListItemIcon>
            <input
              type="text"
              onBlur={(e) => hanldeChangeAddNewTaskToNext(e, id, index)}
              className={classes.inputOfAddNewTask}
              placeholder="Please Write Your New Task"
            />
          </ListItem>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default TaskItem;
