import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import languages from "../../../src/languages";
import { nominalTypeHack } from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "20px 0px",
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
  tag: {
    color: "#fff",
  },
  inputRoot: {
    "& fieldset": {
      border: "1px solid #fff",
    },
  },
  languageField: {
    height: "55px",
  },
}));

const LanguageSelector = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState([]);

  const handleChange = (vals) => {
    props.handleChange("languages", vals);
    setValue(vals);
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        classes={classes}
        multiple
        id="tags-standard"
        value={value}
        getOptionDisabled={() => value.length >= 3}
        options={languages.map((language) => language.name)}
        getOptionLabel={(option) => option}
        onChange={(event, newValue) => {
          handleChange(newValue);
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const selectedLanguage = languages.find((language) => {
              return language.name === option;
            });
            return (
              <Chip
                variant="default"
                label={option}
                {...getTagProps({ index })}
                style={{ backgroundColor: selectedLanguage.color }}
              />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            className={classes.languageField}
            {...params}
            onBlur={props.handleBlur("languages")}
            label="Etiketler"
            placeholder="Etiket seçiniz"
            color="secondary"
          />
        )}
      />
    </div>
  );
};

export default LanguageSelector;
