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
// PHƯƠNG PHÁP CUỐI CÙNG: ÁP DỤNG STYLE LIÊN TỤC BẰNG JAVASCRIPT
// Mã này sẽ ghi đè trực tiếp Inline Style mà thư viện thêm vào.

function applyResponsiveFix() {
    var $targetItems = $('.tt1 .table .btw .owl-item');
    var $targetStage = $('.tt1 .table .btw .owl-stage');
    var windowWidth = $(window).width();
    
    // Chỉ áp dụng FIX 2 CỘT NGANG HÀNG TRÊN MÁY TÍNH
    if (windowWidth >= 768) {
        // Áp dụng cho phần tử chứa: buộc Flexbox và loại bỏ Transform
        $targetStage.css({
            'display': 'flex',
            'flex-wrap': 'wrap',
            'width': '100%',
            'transform': 'none' // Vô hiệu hóa dịch chuyển ngang
        });

        // Áp dụng cho từng khung: buộc 50% chiều rộng
        $targetItems.each(function() {
            $(this).css({
                'width': '50%',
                'max-width': '50%',
                'flex': '0 0 50%',
                'transform': 'none'
            });
            // Xóa style đã được thêm vào trước đó để tránh xung đột
            $(this).removeAttr('style'); 
        });
        
    } 
    // Áp dụng FIX 1 CỘT TRÊN ĐIỆN THOẠI
    else {
        // Áp dụng cho từng khung: buộc 100% chiều rộng
        $targetItems.each(function() {
            $(this).css({
                'width': '100%',
                'max-width': '100%',
                'flex': '0 0 100%',
                'transform': 'none'
            });
            $(this).removeAttr('style'); 
        });
        $targetStage.css('transform', 'none');
    }
}

// Bắt đầu chạy fix ngay sau khi trang load
$(document).ready(function() {
    // Chạy fix ban đầu
    applyResponsiveFix();
    
    // Bỏ comment dòng này để fix chạy LIÊN TỤC mỗi 500ms
    // Nếu các cách trước đó thất bại, đây là giải pháp duy nhất để thắng được thư viện khác
    setInterval(applyResponsiveFix, 500); 

    // Chạy fix khi người dùng thay đổi kích thước cửa sổ
    $(window).on('resize', function() {
        applyResponsiveFix();
    });
});