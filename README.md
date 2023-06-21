#Boardify API API & DATA SCHEMA

1. Log in
   **_Method: POST_**
   **_URL:_**
2. Register
   **_Method: POST_**
   **_URL:_**
3. Workspace
   **_Method: GET_**

**_description:_** front เรียกข้อมูล Workspace ของ user รวมทั้งที่เป็น admin และ member ของ workspace นั้นๆ ซึ่งจะหาจาก
WorkspaceMember.findByPK(userId) จากนั้นจะได้ข้อมูลว่า User คนนั้นอยู่ใน Workspace ไหนบ้าง และให้นำ Workspace join กับ Board เพื่อดึงข้อมูล Board ของ Workspace นั้ันๆ
**_URL:_**
**_Expected Data_**

```js
data = {
  userId: 1,
  workspaces: [
    {
      workspaceName: "CC14_Workspace",
      boards: ["board1", "board2", "board3", "board4", "board5"],
    },
  ],
  members: ["member1", "member2", "member3", "member4"],
};
```
   **_Method: POST_**
**_description:_** front create workspace จะส่ง 

4. Board

**_Method:_**GET
**_description:_** front เรียกข้อมูลเข้าไปใน board ซึ่งจะต้องเห็นข้อมูล Overview ของ Card ทั้งหมด และแต่ละ Card ประกอบด้วย cardName, taskName ,Label, dueDate, comment, checkList, member

**_URL:_**

**_Expected Data_**

```js
data = {
  userId: 1, //user หมายถึง เจ้าของ workspace เพื่อที่จะเอาชื่อไปตรวจว่าเป็น admin ที่จ่ายเงินไหม ถ้าจ่ายเงินก็จะเปิดให้ใช้ฟีเจอร์ comment
  baordId: 1,
  boardName: "board1",
  members: ["member1", "member2", "member3", "member4"], //member รวมของทั้ง board
  cards: [
    {cardID:1,
    cardName:"cardName",
    tasks: [
      {
        taskId: 1t
        taskName: "task1",
        taskDescription: "taskDescription",
        labelColor: "color",
        labelDescription:"labelDescription",
        checkListsTotal: 4,
        checkListsChecked: 2,
        dueDate:"2023/6/30",
        commentsNumber: 3
        members: [{id:1,name:"stang"},{id:2,name:"stang"},{id:3,name:"stang"}],
        //member ที่ทำงานแต่ละ task
        numberOfFilesAttached: 3,

        },
  ],
 }
 ]
};
```

**_Method:_**POST

**_description:_** create card = จะเป็น create name 




**_description:_** front create task ใน card ได้ board ซึ่งจะต้องเห็นข้อมูล Overview ของ Card ทั้งหมด และแต่ละ Card ประกอบด้วย cardName, taskName ,Label, dueDate, comment, checkList, member

5. Task Detail
   **_description:_** front เรียกข้อมูลเข้าไปใน task (component ที่เล็กที่สุดของ card) ซึ่งจะต้องเห็นข้อมูล detail ของ task ทั้งหมด และแต่ละ Card ประกอบด้วย cardName, taskName ,Label, dueDate, comment, checkList, member

```js
data = {
  userId: 1, //user หมายถึง เจ้าของ workspace เพื่อที่จะเอาชื่อไปตรวจว่าเป็น admin ที่จ่ายเงินไหม ถ้าจ่ายเงินก็จะเปิดให้ใช้ฟีเจอร์ comment
  baordId: 1,
boardName: "board1",
members: ["member1", "member2", "member3", "member4"], //member รวมของทั้ง board
cards: [
{cardID:1,
cardName:"",
tasks: [
{
taskId: 1
taskName: "task1",
taskDescription:"",
labelColor:"color",
labelDescription:"description",
checkListTotal: 4,
checkListChecked: 2 [
{id:1, description:"", isChecked:""}
{id:2, description:"", isChecked:""}
{id:3, description:"", isChecked:""}
],
dueDate:"2023/6/30"
comments: [{userId:1, comment:"commeent"}]
members: [{id:1,name:"stang"},{id:2,name:"stang"},{id:3,name:"stang"}]
//member ที่ทำงานแต่ละ task
},
],
}
]
};

```
