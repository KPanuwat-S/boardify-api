const workspaceService = require("../services/workspace-service");

exports.getAllBaords = async (req, res, next) => {
  let response = {};
  try {
    //ไปแกะโทเค็นเอา userId มาใช้ แทน user

    const user = req.query.userId;
    const workspaceData = await workspaceService.getBoard(user);
    response = {
      workspacesData: {
        userId: user,
        workspaces: workspaceData,
      },
    };

    res.status(200).json(response);
    //ตัวการดึงไปใช้หน้าบ้าน
    //console.log(response.workspacesData.workspaces.at(0).name);
    //console.log(response.workspacesData.workspaces.at(1));
    //console.log(response.workspacesData.workspaces.at(0).Boards.at(0));
    //console.log(response.workspacesData.workspaces.at(0).Boards.at(1));
    //console.log(response.workspacesData.workspaces.at(0).Boards.at(0).User);
  } catch (err) {
    next(err);
  }
};

exports.createwokeSpace = async (req, res, next) => {
  try {
    const value = req.body;

    await workspaceService.createwokeSpace(value);

    res.status(200).json({
      message: "สร้างสำเร็จ",
      payload: value,
    });
  } catch (err) {
    next(err);
  }
};
