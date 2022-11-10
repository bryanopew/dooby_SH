export const myPageBtns = [
  { title: "몸무게 변경", id: "ChangeWeight" },
  { title: "내 기록", id: "UserHistory" },
  { title: "찜한 식품", id: "Likes" },
  { title: "서비스 개발 의견", id: "Feedbacks" },
];

export const orderCollapsible = [
  { title: "주문식품", id: "foods" },
  { title: "주문자", id: "orderer" },
  { title: "배송지", id: "adress" },
  { title: "결제수단", id: "payments" },
  { title: "결제금액", id: "totalPrice" },
];

export const numberComma = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const sortBySeller = (foods) => {
  let arr = [];
  let arrTemp = [];
  foods.map((food, idx) => {
    let newSeller = true;
    arr.map((sorted, idx2) => {
      if (sorted.seller == food.seller) {
        arrTemp[idx2].foods.push(food);
        newSeller = false;
      }
    });
    if (newSeller) {
      arrTemp.push({ seller: food.seller, foods: [food] });
    }
    arr = [...arrTemp];
  });
  return arr;
};

/**
 * 전체 userData를 받아 address를 업데이트 해주는 함수
 * @param {object} originalData
 * @param {number} addressId
 * @param {string} postalCode
 * @param {string} base
 * @param {string} detail
 * @returns 업데이트된 userData 반환
 */
export const modifyUserAddress = (
  originalData,
  addressId,
  postalCode,
  base,
  detail
) => {
  console.log("modifyUserAddress: ", originalData);
  console.log("modifyUserAddress: ", addressId);
  console.log("modifyUserAddress: ", postalCode);
  console.log("modifyUserAddress: ", base);
  console.log("modifyUserAddress: ", detail);

  if (addressId === null) return;

  let modifiedAddress = [...originalData.address];
  modifiedAddress[addressId] = {
    postalCode: postalCode,
    addressBase: base,
    addressDetail: detail,
  };

  return {
    // 일부분만 업데이트하는게... 얕은복사로되나? 전체데이터 다 업데이트해야함??!
    ...originalData,
    target: [...originalData.target],
    history: [...originalData.history],
    cart: { ...originalData.cart, foods: [...originalData.cart.foods] },
    address: [...modifiedAddress],
  };
};

export const deleteUserAddress = (originalData, addressId) => {
  console.log("deleteUserAddress: ", originalData);
  console.log("deleteUserAddress: ", addressId);
  if (addressId === null) return;
  let modifiedAddress = [...originalData.address];
  modifiedAddress.splice(addressId, 1);

  return {
    ...originalData,
    target: [...originalData.target],
    history: [...originalData.history],
    cart: { ...originalData.cart, foods: [...originalData.cart.foods] },
    address: [...modifiedAddress],
  };
};
