// Input filter for numeric inputs only
(function ($) {
  $.fn.inputFilter = function (inputFilter) {
    return this.on(
      "input keydown keyup mousedown mouseup select contextmenu drop",
      function () {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      }
    );
  };
})(jQuery);

// Apply input filter and focus/blur effects (Chỉ chạy sau khi DOM đã sẵn sàng)
$(document).ready(function () {
  $("#s1 input").inputFilter(function (value) {
    return /^-?\d*$/.test(value);
  });

  $("#mn input").inputFilter(function (value) {
    return /^-?\d*$/.test(value);
  });

  $("#s1 input.search-field")
    .blur(function () {
      $("#s1 input.search-field").css("border", "1px solid #fff");
    })
    .focus(function () {
      $(this).css("border", "1px solid blue");
    });

  $("#mn input.search-field")
    .blur(function () {
      $("#mn input.search-field").css("border", "1px solid #f2f3f4");
    })
    .focus(function () {
      $(this).css("border", "1px solid blue");
    });
});

// AJAX search function
function fetch() {
  jQuery.ajax({
    url: "https://admin.checkscam.vn/wp-admin/admin-ajax.php",
    type: "post",
    data: { action: "data_fetch", keyword: jQuery("#keyword").val() },
    success: function (data) {
      jQuery("#datafetch").html(data);
    },
  });
}

// PHẦN FIX RESPONSIVE ĐÃ SỬA ỔN ĐỊNH
function applyResponsiveFix() {
  var $targetItems = $(".tt1 .table .btw .owl-item");
  var $targetStage = $(".tt1 .table .btw .owl-stage");
  var windowWidth = $(window).width();

  // FIX 2 CỘT NGANG HÀNG TRÊN MÁY TÍNH
  if (windowWidth >= 768) {
    $targetStage.css({
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
      transform: "none", // vô hiệu hóa dịch chuyển ngang
    });

    $targetItems.each(function () {
      $(this).css({
        width: "50%",
        maxWidth: "50%",
        flex: "0 0 50%",
        transform: "none",
      });
    });
  }
  // FIX 1 CỘT TRÊN ĐIỆN THOẠI
  else {
    $targetItems.each(function () {
      $(this).css({
        width: "100%",
        maxWidth: "100%",
        flex: "0 0 100%",
        transform: "none",
      });
    });
    $targetStage.css("transform", "none");
  }
}

// Bắt đầu chạy fix ngay sau khi trang load
$(document).ready(function () {
  // Chạy fix ban đầu
  applyResponsiveFix();

  // Chạy lại khi người dùng thay đổi kích thước cửa sổ (chỉ lúc resize)
  $(window).on("resize", function () {
    applyResponsiveFix();
  });
});
