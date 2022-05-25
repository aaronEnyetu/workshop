## The Golden Rule:

🦸 🦸‍♂️ `Stop starting and start finishing.` 🏁

If you work on more than one feature at a time, you are guaranteed to multiply your bugs and your anxiety.

## Making a plan

## 1. Database Setup

Add two tables

|Workshops|          |
| --------| -------- |
| name    | varchar  |


| participants |                                |
| ------------ | -------------------------------|
| name         | varchar                        |
| contact_info | varchar                        |
| workshop_id  | foreign key (workshops)        |

- Add some test data to workshops / participants
- Add RLS so that only authenticated users can add, do anything with the data {select, update, delete, create}

## 2. Workshops Page

1. Add `getWorkshops` function to `fetch-utils.js` to fetch all the workshops and their participants
2. TDD `renderWorkshop` function that displays the workshop and its participants
3. Use both function to loop through workshops and display on page


## 3. Create Page
1. Add form element to our HTML for name, contact_info and a placeholder `<select>` for the workshops
2. Get the workshops (using `getWorkshops`) and dynamically add an `<option>` to our select for each workshop
3. Add a `createParticipant` function to fetch-utils.js that sends participants data to supabase and adds a new row 

```js
createParticipant({ name: 'Aaron', contact_info: 'aaron@alchemycodelab.com', workshop_id: 2 });
```
4. Add our form event listener, get the form data and send to supabase using `createParticipant`


## 4. Delete Participant 
1. Add `deleteParticipant {id}` function in `fetch-utils.js`
2. Add dynamic event listener to the render function that calls deleteParticipant