const { Workspace, Board, User, WorkspaceMember } = require("../models");

exports.getBoard = async (id) => {
  //หา workspaces ทั้งหมด
  const workspaces = await Workspace.findAll({
    attributes: ["id", "name"],
    //ที่มี userId = ค่า input
    where: { userId: id },
    include: [
      {
        //โดยที่ดึงข้อมูลทั้งหมดของ Board ที่มี workspacesID
        model: Board,
      },
      {
        //โดยที่ดึงข้อมูลทั้งหมดของ WorkspaceMember ที่มี workspacesID
        model: WorkspaceMember,
        //นำข้อมูลทั้งหมดของ User ใส่ใน WorkspaceMember
        include: [User], //userId ที่อยู่ใน workspacesId
      },
    ],
  });

  return workspaces;
};
exports.createwokeSpace = (workspace) => Workspace.create(workspace);
