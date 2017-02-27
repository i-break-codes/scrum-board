# scrum-board
JavaScript Scrum App to manage tasks with ease.

> Warning : It uses localstorage to store your tasks, make sure you don't clean up your Local Storage for this app atleast.

---

#### Instructions (How to use Scrum Board)
- Create a new task by clicking on the Plus(Blue) icon on the footer
- Update a task by double clicking on Description text, Link text or Assigned to text, card will show (Edit Mode Enabled) text.
- All updated text will be saved automatically without you doing anything except for typing out your edits on the card. (Can't edit titles as of now, will be released in next version.)
- Drag your task card to the bin(red) on the footer to delete your task (Note that this cannot be reverted)
- Move your task card around to update the status of your task, say from Development to Testing and so on.
- Update a column name by double clicking on Title text.

---

#### Demo
[View](https://i-break-codes.github.io/scrum-board/)

---

#### Setup
- Clone Application by typing the following command in your terminal `git@github.com:i-break-codes/scrum-board.git`
- Install node modules - `npm install`
- Compile Assets - `gulp`

---

#### More to come
- [x] Edit task title
- [ ] Set tasks priority
- [ ] Import / Export tasks
- [ ] Remember expanded/collapsed state of a task
- [ ] Database / Websockets for collab board

---

#### Support
- Bugs and requests, submit them through the project's issues section
- Questions? DM or Tweet me [@mr_ali3n](https://twitter.com/mr_ali3n)