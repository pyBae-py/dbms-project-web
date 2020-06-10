import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minWidth: 300,
    width: "100%",
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const Category1 = () => {
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    try {
      const response = await fetch("http://localhost:5000/category/1");
      const jsonData = await response.json(); // Parser
      setCategory(jsonData);
    } catch (error) {
      console.log(`Error Getting Category 1: ${error}`);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const classes = useStyles();

  return (
    <Fragment>
      {category.map((item) => (
        <div className={classes.root} key={item.id}>
          <ButtonBase
            focusRipple
            key={item.name}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: "100%",
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${item.picture_link})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component='span'
                variant='subtitle1'
                color='inherit'
                className={classes.imageTitle}
              >
                {item.name}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        </div>
      ))}
    </Fragment>
  );
};

export default Category1;
