import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../api/axiosWithAuth";
import {useParams} from 'react-router-dom';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);
  const params = useParams();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(response => {
        axiosWithAuth().get('http://localhost:5000/api/colors')
          .then(response => {
            updateColors(response.data)
          })
          .catch(error => console.log(error.message));
        console.log(response.data)
      })
      .catch(error => console.log(error.message));
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(response => {
        console.log(response)
        updateColors(colors.filter(colorId => colorId.id !== color.id ))
      })
      .catch(error => console.log(error))
    };

    const addColor = e => {
      e.preventDefault();
      axiosWithAuth().post('http://localhost:5000/api/colors', newColor)
        .then(response => {
          updateColors(response.data)
          setNewColor(initialColor);
        })
        .catch(error => console.log(error))
    }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <div className='addColorFormContainer'>
          <form onSubmit={addColor}>
            <legend>add your new color</legend>
            <label className='addColorLabel' htmlFor='color'>color name:    
              <input className='addColorInput' type='text' name='color' id='color' value={newColor.color} onChange={(event) => {
                setNewColor({
                  ...newColor,
                  color: event.target.value
                })
              }} />
            </label>
            <label className='addColorLabel' htmlFor='hex'>hex code:
              <input className='addColorInput' type='text' name='hex' id='hex' value={newColor.code.hex} onChange={(event) => {
                setNewColor({
                  ...newColor,
                  code: { hex: event.target.value}
                })
              }} />
            </label>
            <button type='submit' className='addColorButton'>Add your own color!</button>
          </form>
        </div>
    </div>
  );
};

export default ColorList;
