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
// BỔ SUNG CODE JAVASCRIPT: VÔ HIỆU HÓA INLINE STYLE VÀ TRANSFORM CỦA CAROUSEL
// Đảm bảo chạy sau khi tất cả nội dung trang đã load.

function fixOwlCarouselLayout() {
    var $targetItems = $('.tt1 .table .btw .owl-item');
    var $targetStage = $('.tt1 .table .btw .owl-stage');
    
    // XÓA style="width: xxx; transform: translate3d..." do JS thêm vào trên từng khung
    $targetItems.each(function() {
        $(this).removeAttr('style'); 
    });
    
    // XÓA style="width: xxx; transform: translate3d..." trên phần tử chứa
    $targetStage.removeAttr('style'); 
}

// Chạy hàm sửa lỗi sau khi trang đã load hoàn toàn
$(window).on('load', function() {
    // Chạy fix ngay lập tức
    fixOwlCarouselLayout();
    
    // Chạy fix lần nữa sau 100ms để bắt các tính toán sau cùng của thư viện
    setTimeout(fixOwlCarouselLayout, 100); 
    
    // Chạy fix khi người dùng thay đổi kích thước cửa sổ (responsive)
    $(window).on('resize', function() {
        fixOwlCarouselLayout();
    });
});