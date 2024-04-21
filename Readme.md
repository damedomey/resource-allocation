# Resource allocation

## Description
This project is a simple resource allocation system. The system is composed of two parts:
- A backend part that manages the resources and the reservations.
- A frontend part that allows the user to interact with the system.

## How to run the project
To run the project, you need to have nodejs and npm installed on your machine. Go to the api/ folder and run the following command:

```bash
npm install
npm start
```
Then, go to the frontend/ folder and just open index file in your browser.

## Notice : 
The choice of json database is made to simplify the use of the program. The database is 
not intended to be used in a production environment. Besides, the json database choice is made
according to the constraint of the tutors of the project who asked to use a json database :).
The second constraint is to not use any framework to build the project.

## Form configuration file
The form are created dynamically according to the configuration files. The configuration files are located in data/ folder.
Basically, to add a field on the form, you can add the following code : 
```json
{
  "type": "text|number|select|checkbox|group|multi-select",
  "name": "nameOfTheField",
  "label": "LabelOfTheField",
  "description": "The placeholder of the field if applicable",
  "required": true|false,
  "values": ["value1", "value2", ...],
}
```
The treatment of the field depend on his type. 

### Type text or number
The text type is a simple text input. The value of the field is a string or number.

### Type select or multi-select
The select type is a select input. The value of the field is a string or array of string. The attribute values is an array of string that contains 
the possible values of the field.

### Type checkbox
The checkbox type is a checkbox input. The value of the field is a boolean.

### Type group
The group type is a group of fields. The values attribute is an array of field type. It's alike using multiple fields.


In every case, the label is the text that will be displayed on the form. The name is the name of the field that will be used to store the value of the field.
The description is the placeholder of the field if applicable. The required field is a boolean that indicates if the field is required or not.
The values field is an array of string that contains the possible values of the field. 

