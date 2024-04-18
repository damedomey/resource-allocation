# Resource allocation

## Notice : 
The choice of json database is made to simplify the use of the program. The database is 
not intended to be used in a production environment. Also, the json database choice is made
according to the constraint of the tutors of the project who asked to use a json database :).

## Json configuration file
The json configuration files are located in data/ folder. Basically, the format of these files is as follows:
```json
[
  {
    "id": "the-slug-of-the-resource",
    "name": "The name of the resource"
  }
]
```
This is the format for list of equipments, the types of occupations, ...
The frontend will use these files to display the list of element. Do not change the slug (id) of the element in json file 
because the relation with another element in database won't longer working if you do so.