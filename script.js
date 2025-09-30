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

// Close modal functionality
$(".ess").click(function () {
  $(this).css("display", "none");
  $(".ifr").css("display", "none");
});

// Redirect to HTTPS if on HTTP (Lưu ý: Dòng này có thể không cần thiết nếu server đã cấu hình sẵn)
if (window.location.protocol == 'http:') { 
  window.location.href =  window.location.href.replace( 'http:', 'https:'); 
}
// BƯỚC 2: SỬA LỖI BỐ CỤC BẰNG JAVASCRIPT
// Chạy sau khi trang web đã load hoàn toàn

$(window).on('load', function() {
    // 1. Tạm dừng và hủy Owl Carousel trên màn hình lớn
    if ($(window).width() >= 768) {
        // Nếu carousel đã được khởi tạo, hủy nó đi để nó không thêm style
        var owl = $('.tt1 .table .btw .owl-carousel');
        if (owl.hasClass('owl-loaded')) {
            owl.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        }

        // 2. XÓA INLINE STYLE VÀ ÁP DỤNG CSS CẦN THIẾT
        // Tìm tất cả các phần tử slide và xóa thuộc tính 'style'
        $('.tt1 .table .btw .owl-item').each(function() {
            // Xóa mọi style inline do thư viện thêm vào
            $(this).removeAttr('style'); 
        });
        
        // Xóa style trên phần tử stage
        $('.tt1 .table .btw .owl-stage').removeAttr('style'); 
    }
});