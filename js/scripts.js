//==============pricing===================
var products = {
 
  male: {
    white: {
      plain: {
        unit_price: 5.12,
        photo: "v-white.jpg",
      },
      printed: {
        unit_price: 8.95,
        photo: "v-white-personalized.jpg",
      },
    },
  
    colored: {
      plain: {
        unit_price: 6.04,
        photo: "v-color.jpg",
      },
      printed: {
        unit_price: 9.47,
        photo: "v-color-personalized.png",
      },
    },
  },
 female: {
    white: {
      plain: {
        unit_price: 5.12,
        photo: "women-w-plain.png",
      },
      printed: {
        unit_price: 8.95,
        photo: "women-w-printed.jpg",
      },
    },
    colored: {
      plain: {
        unit_price: 6.04,
        photo: "women-c-plain.jpg",
      },
      printed: {
        unit_price: 9.47,
        photo: "women-c-printed.jpg",
      },
    },
  }
};

// ===============Search params===========

var search_params = {
  gender: "",
  quantity: "",
  color: "",
  quality: "",
  style: "",
};

// Additional pricing rules:

// 1. The prices above are for Basic quality (q150).
// The high quality shirt (190g/m2) has a 12% increase in the unit price.

// 2. Apply the following discounts for higher quantities:
// 1: above 1.000 units - 20% discount
// 2: above 500 units - 12% discount
// 3: above 100 units - 5% discount

// Solution:

var finalColor = "colored",
finalStyle = "printed",
finalQuantity = 10,
finalQuality = "Basic quality (q150)",
finalCost,
finalImage = "img/v-color-personalized.png";
finalGender = "male";
$(function () {
  
  $("#result-gender").text("Male");
  $("#result-quantity").text("10");
  $("#result-style").text("Printed");
  $("#result-quality").text("Basic quality (q150)");
  $("#result-color").text("White");
  updateImage();
  updateCost();
  
  // ================================gender==================================
  $("#gender").change(function () {
    search_params.gender = $("#gender").val();
    $("#result-gender").text(search_params.gender);
    finalGender = search_params.gender.toLowerCase();
    console.log(finalGender);
    updateCost();
    updateImage();
  });
  // ================================quantity==================================
  $("#quantity").change(function () {
    search_params.quantity = $("#quantity").val();
    $("#result-quantity").text(search_params.quantity);
    finalQuantity = search_params.quantity;
    // console.log(finalQuantity);
    updateCost();
    updateImage();
  });

  // ================================white color==================================
  $("#white").click(function () {
    $("#white").addClass("selected");
    $("#colored").removeClass("selected");
    search_params.color = $("#white").text();
    $("#result-color").text(search_params.color);
    finalColor = search_params.color.toLowerCase();
    // console.log(finalColor);
    updateCost();
    updateImage();
  });
  // ================================colored==================================
  $("#colored").click(function () {
    $("#colored").addClass("selected");
    $("#white").removeClass("selected");
    search_params.color = $("#colored").text();
    $("#result-color").text(search_params.color);
    finalColor = search_params.color.toLowerCase();
    // console.log(finalColor);
    updateCost();
    updateImage();
  });
  // ================================basic quality==================================
  $("#q150").click(function () {
    $("#q150").addClass("selected");
    $("#q190").removeClass("selected");
    search_params.quality = $("#q150").text();
    $("#result-quality").text(search_params.quality);
    finalQuality = search_params.quality;
    // console.log(finalQuality);
    updateCost();
    updateImage();
  });
  // ================================high quality==================================
  $("#q190").click(function () {
    $("#q190").addClass("selected");
    $("#q150").removeClass("selected");
    search_params.quality = $("#q190").text();
    $("#result-quality").text(search_params.quality);
    finalQuality = search_params.quality;
    // console.log(finalQuality);
    updateCost();
    updateImage();
  });

  // ================================ style==================================
  $("#style").change(function () {
    search_params.style = $("#style").val();
    $("#result-style").text(search_params.style);
    finalStyle = search_params.style.toLowerCase();
    // console.log(finalStyle);
    updateCost();
    updateImage();
  });
  //===================T O T A L     C O S T=========================================
  function updateCost() {
    $(".refresh-loader").show();
    finalCost = products[finalGender][finalColor][finalStyle].unit_price;
    if (finalQuality == "High (190g / m2)") {
      //high quality price increase
      finalCost *= 1.12;
    }
    finalCost *= finalQuantity;
    if (finalQuantity > 1000) {
      finalCost *= 0.8;
    } else if (finalQuantity > 500) {
      finalCost *= 0.88;
    } else if (finalQuantity > 100) {
      finalCost *= 0.95;
    }

    $("#total-price").text(
      finalCost.toLocaleString("en-US", { style: "currency", currency: "USD" })
    );
    window.setTimeout(function () {
      $(".refresh-loader").hide();
    }, 500);
    // console.log(finalCost);
    }
    // ==================================IAmage update function===========================
  function updateImage() {
    finalImage = products[finalGender][finalColor][finalStyle].photo;
    finalImage = "img/" + finalImage;

    $("#photo-product").attr("src", finalImage);
    // console.log(finalImage);
    }
    // ============================alert=========================
  $("#complete-order").click(function () {
    alert("Thank You.....! Your Order has been Placed");
  });
// ==================================name saving in local Storage=======================
    $("#submit-name").click(function () {
    var name = $("#name-user").val();
    if (!name) {
      alert("Enter you name");
    } else {
      localStorage.setItem("name", name);
      great_user();
    }
  });
  $("#not-me").click(function () {
    localStorage.removeItem("name");
    $("#welcome-area").hide();
    $("#name-user").val("");
    $("#name-field").show();
  });
  function great_user() {
    $("#name-field").hide();
    $("#welcome-text").text("Hi " + localStorage.name + ", how are you?");
    $("#not-me").text("Not " + localStorage.name + " ?");
    $("#welcome-area").show();
  }
  if (localStorage.name) {
    great_user();
  }
});

