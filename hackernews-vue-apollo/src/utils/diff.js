// var diff = require('deep-diff')

var observableDiff = require('deep-diff').observableDiff;

let state = [{"createVote": {
  "id": "cjkjzqvgo5os70161ygah8ts6",
  "link": {
    "votes": [
      {
        "id": "cjkcaovoc0t3401404lclq36x",
        "user": {
          "id": "cjkca8bq70odq016862m5ucew",
          "__typename": "User"
        },
        "__typename": "Vote"
      },
      {
        "id": "cjkcxtu7m05q40123mlar3euz",
        "user": {
          "id": "cjkcxrn5a052l0181h3qhsdlp",
          "__typename": "User"
        },
        "__typename": "Vote"
      },
      {
        "id": "cjkd333lo1gfz01462beqxf1n",
        "user": {
          "id": "cjkd30gom1fn50107129q3xgw",
          "__typename": "User"
        },
        "__typename": "Vote"
      },
      {
        "id": "cjkeuujm506co0186mnyv2wtk",
        "user": {
          "id": "cjkd7dgrs0ac60165lvmawjce",
          "__typename": "User"
        },
        "__typename": "Vote"
      },
      {
        "id": "cjkimvj4b1yzq0158pyqe7s8i",
        "user": {
          "id": "cjkimupbp2l720182pf4kmxhi",
          "__typename": "User"
        },
        "__typename": "Vote"
      },
      {
        "id": "cjkin87wg022t0103txw0d7vo",
        "user": {
          "id": "cjkd5a81q1xd00146liej0mjf",
          "__typename": "User"
        },
        "__typename": "Vote"
      },
      {
        "id": "cjkiq32m60ucq0187x38qzatb",
        "user": {
          "id": "cjkeuwh8a06ny0155ufzlxfee",
          "__typename": "User"
        },
        "__typename": "Vote"
      },
      {
        "id": "cjkjzqvgo5os70161ygah8ts6",
        "user": {
          "id": "cjkimupbp2l720182pf4kmxhi",
          "__typename": "User"
        },
        "__typename": "Vote"
      }
    ],
    "__typename": "Link"
  },
  "user": {
    "id": "cjkimupbp2l720182pf4kmxhi",
    "__typename": "User"
  },
  "__typename": "Vote"
}
}, {
"createVote": {
  "id": "cjkk08fvw5yg40152ayt208vb",
  "link": {
    "votes": [
      {
        "id": "cjkc9m1ve0i9s0173eu1wnop6",
        "user": {
          "id": "cjkc64n8r1gsr0187gvdcwwyp",
          "__typename": "User"
        },
        "__typename": "Vote"
      },
      {
        "id": "cjkcxnb0e03sg01769iztwh2c",
        "user": {
          "id": "cjkca8bq70odq016862m5ucew",
          "__typename": "User"
        },
        "__typename": "Vote"
      },
      {
        "id": "cjkcyezbe0adi01464vq14rqy",
        "user": {
          "id": "cjkcxrn5a052l0181h3qhsdlp",
          "__typename": "User"
        },
        "__typename": "Vote"
      },
      {
        "id": "cjkd5f9gl1ydq01393vsp99bu",
        "user": {
          "id": "cjkd5a81q1xd00146liej0mjf",
          "__typename": "User"
        },
        "__typename": "Vote"
      },
      {
        "id": "cjkd62tg102i601054jwz4l2e",
        "user": {
          "id": "cjkd30gom1fn50107129q3xgw",
          "__typename": "User"
        },
        "__typename": "Vote"
      },
      {
        "id": "cjkimvqk221us0184vr7tz1ue",
        "user": {
          "id": "cjkimupbp2l720182pf4kmxhi",
          "__typename": "User"
        },
        "__typename": "Vote"
      },
      {
        "id": "cjkiqoyf40zxz01262q7f2eho",
        "user": {
          "id": "cjkingyta05cg0104n0o987dd",
          "__typename": "User"
        },
        "__typename": "Vote"
      },
      {
        "id": "cjkk08fvw5yg40152ayt208vb",
        "user": {
          "id": "cjkimupbp2l720182pf4kmxhi",
          "__typename": "User"
        },
        "__typename": "Vote"
      }
    ],
    "__typename": "Link"
  },
  "user": {
    "id": "cjkimupbp2l720182pf4kmxhi",
    "__typename": "User"
  },
  "__typename": "Vote"
}
}]

let lhs = state[0];
let rhs = state[1];


observableDiff(lhs, rhs, (change) => {
    console.log(change)
  });  