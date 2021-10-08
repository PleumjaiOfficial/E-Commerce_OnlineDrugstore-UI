/* products data test 
  will be deleted when integrated with database
*/
const products = [
  {
    id: "1",
    name: "red pills",
    image: "red-pills.png",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    price: 320,
    remain: 100,
    health_goal: ["brain", "stress"],
  },
  {
    id: "2",
    name: "blue pills",
    image: "blue-pills.png",
    description: `Curabitur porttitor, nulla vel faucibus dapibus, magna leo gravida felis, 
      nec mattis nisl erat eget dui. Quisque libero velit, tincidunt dictum bibendum iaculis, 
      varius non lacus. Fusce vitae accumsan ipsum. Aliquam erat volutpat. Nulla volutpat mattis augue id pretium. 
      Nulla tincidunt efficitur metus et vehicula. Nullam tincidunt sollicitudin nisi, id imperdiet odio auctor eu. 
      Suspendisse dictum luctus ex eget mattis. Pellentesque ipsum nisl, elementum nec euismod id, aliquet ut mauris.`,
    price: 400,
    remain: 90,
    health_goal: ["face", "sleep"],
  },
  {
    id: "3",
    name: "black pills",
    image: "black-pills.png",
    description: `Ut maximus ex at purus faucibus posuere. Phasellus non orci a orci imperdiet blandit. 
      Cras ullamcorper eleifend felis at tempor. Aenean dui justo, egestas ut urna at, 
      blandit semper sem. Donec feugiat lorem efficitur rutrum efficitur. Vivamus fermentum, odio eu aliquam finibus, 
      magna magna efficitur ipsum, id eleifend felis felis at enim. Integer imperdiet porttitor erat, 
      at tincidunt lectus vehicula sit amet.`,
    price: 500,
    remain: 10,
    health_goal: ["power", "strength"],
  },
  {
    id: "4",
    name: "white pills",
    image: "white-pills.png",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    price: 320,
    remain: 100,
    health_goal: ["brain", "stress"],
  },
  {
    id: "5",
    name: "purple pills",
    image: "purple-pills.png",
    description: `Curabitur porttitor, nulla vel faucibus dapibus, magna leo gravida felis, 
      nec mattis nisl erat eget dui. Quisque libero velit, tincidunt dictum bibendum iaculis, 
      varius non lacus. Fusce vitae accumsan ipsum. Aliquam erat volutpat. Nulla volutpat mattis augue id pretium. 
      Nulla tincidunt efficitur metus et vehicula. Nullam tincidunt sollicitudin nisi, id imperdiet odio auctor eu. 
      Suspendisse dictum luctus ex eget mattis. Pellentesque ipsum nisl, elementum nec euismod id, aliquet ut mauris.`,
    price: 400,
    remain: 90,
    health_goal: ["face", "sleep"],
  },
  {
    id: "6",
    name: "rainbow pills",
    image: "rainbow-pills.png",
    description: `Ut maximus ex at purus faucibus posuere. Phasellus non orci a orci imperdiet blandit. 
      Cras ullamcorper eleifend felis at tempor. Aenean dui justo, egestas ut urna at, 
      blandit semper sem. Donec feugiat lorem efficitur rutrum efficitur. Vivamus fermentum, odio eu aliquam finibus, 
      magna magna efficitur ipsum, id eleifend felis felis at enim. Integer imperdiet porttitor erat, 
      at tincidunt lectus vehicula sit amet.`,
    price: 500,
    remain: 10,
    health_goal: ["power", "strength"],
  },
];

module.exports = products;