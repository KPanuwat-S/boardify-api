#Boardify API API & DATA SCHEMA

1.Log in
***Method: POST***

2.Register
***Method: POST***
ไปเปลี่ยน PORT ที่ไฟล์ emailVerifyService ที่ exports.verify -> const mailGenerator -> link: "http://localhost:(ใส่ Port หน้าบ้านของตัวเอง)/"

3.Workspace
***Method: GET***

***description:*** front เรียกข้อมูล Workspace ของ user รวมทั้งที่เป็น admin และ member ของ workspace นั้นๆ ซึ่งจะหาจาก
WorkspaceMember.findByPK(userId) จากนั้นจะได้ข้อมูลว่า User คนนั้นอยู่ใน Workspace ไหนบ้าง และให้นำ Workspace join กับ Board เพื่อดึงข้อมูล Board ของ Workspace นั้ันๆ

***Expected Data***

```js
data = {
  userId: "1",
  workspaces: [
    {
      workspaceName: "CC14_Workspace",
      boards: ["board1", "board2", "board3", "board4", "board5"],
    },
  ],
  members: ["member1", "member2", "member3", "member4"],
};
```
