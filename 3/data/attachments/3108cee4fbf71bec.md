# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/uiDesktopVisual.spec.ts >> Desktop UI Visual Tests >> [Chi tiết sản phẩm] [Toàn bộ trang] So sánh Figma ↔ Web
- Location: tests/ui/uiDesktopVisual.spec.ts:28:17

# Error details

```
Error: AI báo lỗi: Giao diện Web thực tế bị lỗi cấu trúc nghiêm trọng khi thiếu hoàn toàn khối 'Thông số kỹ thuật' ở bên phải, khiến phần 'Chi tiết sản phẩm' bị dãn tràn toàn bộ chiều rộng. Ngoài ra, còn thiếu thông tin 'Mã sp' dưới tiêu đề và các icon trong ô nhập liệu tư vấn bị lỗi hiển thị thành ô vuông rỗng.
Đã đính kèm 3 ảnh chi tiết lỗi vào báo cáo.

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e5]:
    - generic [ref=e6]:
      - link "Điện máy Trần Quang" [ref=e7] [cursor=pointer]:
        - /url: https://code4.mimadigi.vn/2026/july/tranquang_108426W/
        - img "Điện máy Trần Quang" [ref=e8]
      - generic [ref=e9]:
        - paragraph [ref=e10]: Công ty SX-TM-DV-KỸ THUẬT
        - paragraph [ref=e11]: ÂM THANH - ÁNH SÁNG
    - generic [ref=e13]:
      - button "Tìm kiếm" [ref=e14] [cursor=pointer]:
        - img [ref=e15]
      - textbox "Tìm theo tên" [ref=e16]
    - generic [ref=e18]:
      - generic [ref=e21]:
        - generic [ref=e22]: Hotline 1
        - link "0936106552" [ref=e23] [cursor=pointer]:
          - /url: tel:0936106552
      - generic [ref=e26]:
        - generic [ref=e27]: Hotline 2
        - link "0936106552" [ref=e28] [cursor=pointer]:
          - /url: tel:0936106552
  - generic [ref=e33]:
    - link "Danh Mục sản phẩm" [ref=e35] [cursor=pointer]:
      - /url: javascript:;
      - img [ref=e36]
      - generic [ref=e41]: Danh Mục sản phẩm
    - list [ref=e42]:
      - listitem [ref=e43]:
        - link "Trang chủ" [ref=e44] [cursor=pointer]:
          - /url: ""
      - listitem [ref=e45]:
        - link "Giới thiệu" [ref=e46] [cursor=pointer]:
          - /url: gioi-thieu
      - listitem [ref=e47]:
        - link "Dịch vụ" [ref=e48] [cursor=pointer]:
          - /url: dich-vu
          - text: Dịch vụ
      - listitem [ref=e50]:
        - link "Dự án" [ref=e51] [cursor=pointer]:
          - /url: du-an
      - listitem [ref=e52]:
        - link "Tài liệu kỹ thuật" [ref=e53] [cursor=pointer]:
          - /url: tai-lieu-ky-thuat
      - listitem [ref=e54]:
        - link "Tin tức & Sự kiện" [ref=e55] [cursor=pointer]:
          - /url: tin-tuc-va-su-kien
      - listitem [ref=e56]:
        - link "Liên hệ" [ref=e57] [cursor=pointer]:
          - /url: lien-he
  - list [ref=e60]:
    - listitem [ref=e61]:
      - link "Trang chủ" [ref=e62] [cursor=pointer]:
        - /url: https://code4.mimadigi.vn/2026/july/tranquang_108426W/
    - listitem [ref=e63]:
      - text: ">"
      - link "Sản phẩm" [ref=e64] [cursor=pointer]:
        - /url: https://code4.mimadigi.vn/2026/july/tranquang_108426W/san-pham
    - listitem [ref=e65]:
      - text: ">"
      - link "Hệ thống âm thanh" [ref=e66] [cursor=pointer]:
        - /url: https://code4.mimadigi.vn/2026/july/tranquang_108426W/he-thong-am-thanh
    - listitem [ref=e67]:
      - text: ">"
      - link "Loa" [ref=e68] [cursor=pointer]:
        - /url: https://code4.mimadigi.vn/2026/july/tranquang_108426W/loa
    - listitem [ref=e69]:
      - text: ">"
      - link "Loa BMB CSE-312-SE (Cặp)" [ref=e70] [cursor=pointer]:
        - /url: https://code4.mimadigi.vn/2026/july/tranquang_108426W/loa-bmb-cse-312-se-cap
  - generic [ref=e71]:
    - generic [ref=e74]:
      - generic [ref=e76]:
        - listbox [ref=e79]:
          - option "Loa BMB CSE-312-SE (Cặp)" [ref=e80]:
            - link "Loa BMB CSE-312-SE (Cặp)" [ref=e81] [cursor=pointer]:
              - /url: thumbs/634x529x2/upload/product/loa-bmb-cse-312-se-cap-7894.png
              - img "Loa BMB CSE-312-SE (Cặp)" [ref=e82]
        - listbox [ref=e86]:
          - option "Loa BMB CSE-312-SE (Cặp)" [ref=e87]:
            - link "Loa BMB CSE-312-SE (Cặp)" [ref=e88] [cursor=pointer]:
              - /url: javascript:;
              - img "Loa BMB CSE-312-SE (Cặp)" [ref=e89]
      - list [ref=e91]:
        - generic [ref=e92]: Loa BMB CSE-312-SE (Cặp)
        - listitem [ref=e93]:
          - generic [ref=e95]: "Giá:Liên hệ: 0936106552"
        - listitem [ref=e97]:
          - generic [ref=e98]: Mô tả sản phẩm
          - paragraph [ref=e100]: Loa BMB CSE-312-SE (Cặp) là dòng loa karaoke cao cấp đến từ Nhật Bản, nổi bật với thiết kế 3 đường tiếng giúp tái tạo âm thanh mạnh mẽ, trong trẻo và cân bằng trên toàn dải tần. Sản phẩm được trang bị loa bass 30cm kết hợp công suất tối đa 800W, mang đến âm trầm sâu, chắc khỏe, âm trung rõ ràng và âm cao chi tiết, giúp giọng hát trở nên sáng, mượt và giàu cảm xúc. Với thiết kế hiện đại, thùng loa chắc chắn cùng linh kiện chất lượng cao, BMB CSE-312-SE không chỉ đảm bảo hiệu suất hoạt động ổn định mà còn có độ bền vượt trội trong quá trình sử dụng lâu dài. Đây là lựa chọn lý tưởng cho hệ thống karaoke gia đình cao cấp, phòng giải trí, phòng karaoke kinh doanh và các không gian âm thanh chuyên nghiệp, đáp ứng tốt nhu cầu ca hát cũng như thưởng thức âm nhạc với chất lượng ấn tượng.
        - listitem [ref=e101]:
          - generic [ref=e102]: Liên hệ với chúng tôi để được hỗ trợ tư vấn
          - generic [ref=e104]:
            - textbox "Nhập họ và tên" [ref=e108]
            - spinbutton [ref=e112]
            - button "Gửi để nhận tư vấn" [ref=e114] [cursor=pointer]: Gửi để nhận tư vấn
    - generic [ref=e121]:
      - heading "Chi tiết Sản phẩm" [level=2] [ref=e124]
      - generic [ref=e126]:
        - generic [ref=e127] [cursor=pointer]:
          - img [ref=e128]
          - text: Mục lục
          - img [ref=e131]
        - text: ▾
      - text: ▾
      - generic [ref=e134]:
        - paragraph [ref=e135]:
          - text: Âm nhạc không chỉ là những giai điệu vang lên rồi tắt lịm, mà là người bạn đồng hành xoa dịu tâm hồn và khơi dậy nguồn năng lượng sống tích cực. Để những khoảnh khắc sum vầy bên gia đình hay những buổi trình diễn ca hát thêm phần trọn vẹn, một thiết bị tái tạo âm thanh đẳng cấp là điều không thể thiếu. Được mệnh danh là dòng sản phẩm huyền thoại mang linh hồn của âm thanh karaoke Nhật Bản,
          - link "Loa BMB CSE-312-SE (Cặp)" [ref=e136] [cursor=pointer]:
            - /url: https://code4.mimadigi.vn/2026/july/tranquang_108426W/loa-bmb-cse-312-se-cap
          - text: chính là sự lựa chọn tuyệt vời để bạn chạm đến tận cùng của cảm xúc âm nhạc chân thực và sống động.
        - heading "Loa BMB Đỉnh cao âm thanh Nhật Bản – Câu chuyện của sự hoàn mỹ" [level=2] [ref=e137]
        - paragraph [ref=e138]: Thương hiệu BMB từ lâu đã khắc sâu vào tâm trí người yêu nhạc Việt Nam như một biểu tượng của chất lượng, sự bền bỉ và nhạc tính đỉnh cao. Mỗi dòng loa ra đời là cả một quá trình nghiên cứu, thử nghiệm khắt khe của các kỹ sư âm thanh hàng đầu Nhật Bản. Loa BMB CSE-312-SE (Cặp) xuất hiện không chỉ đơn thuần là một thiết bị phát nhạc, mà là hiện thân của nghệ thuật âm thanh đỉnh cao, nâng tầm không gian sống của bạn thành một khán phòng thu nhỏ.
        - paragraph [ref=e139]: Sự tinh tế của dòng loa này nằm ở khả năng cân bằng tuyệt đối giữa sức mạnh uy lực và sự mềm mại, mượt mà trong từng ca từ. Khi bạn cất tiếng hát, giọng ca được tái hiện một cách tự nhiên, ấm áp và dạt dào cảm xúc, giúp bạn tự tin phô diễn những nốt cao bay bổng hay những quãng trầm sâu lắng.
        - heading "Những đột phá công nghệ làm nên danh tiếng BMB CSE-312-SE" [level=2] [ref=e140]
        - heading "Thiết kế loa tweeter xoay hướng độc đáo" [level=3] [ref=e141]
        - paragraph [ref=e142]: Điểm khác biệt lớn nhất giúp dòng loa này vượt trội so với các đối thủ cùng phân khúc là thiết kế loa tweeter (loa treble) và squawker (loa trung) có cấu trúc xoay linh hoạt. Các kỹ sư đã khéo léo thiết kế các hốc loa trung và treble với khả năng điều chỉnh hướng hướng âm độc lập. Điều này giúp sóng âm lan tỏa đều khắp mọi ngóc ngách trong phòng, loại bỏ hoàn toàn các điểm chết âm thanh, mang đến trải nghiệm nghe nhạc đồng đều dù bạn ngồi ở bất kỳ vị trí nào.
        - heading "Loa bass 30cm uy lực và sâu lắng" [level=3] [ref=e143]
        - paragraph [ref=e144]: Sở hữu củ loa bass có đường kính lên tới 30cm (3 tấc), sản phẩm mang đến những dải âm trầm vô cùng uy lực, chắc nịch nhưng không hề bị vỡ tiếng hay gây cảm giác tức ngực. Màng loa được chế tạo từ loại giấy chuyên dụng cao cấp được sản xuất trực tiếp tại Nhật Bản, có độ dẻo dai và đàn hồi cực cao, giúp chịu được áp lực âm thanh lớn trong thời gian dài mà vẫn giữ nguyên được độ trung thực.
        - heading "Khả năng tương thích và phối ghép hoàn hảo" [level=3] [ref=e145]
        - paragraph [ref=e146]: Với công suất định mức linh hoạt và trở kháng 8 Ohm, thiết bị dễ dàng kết hợp với nhiều dòng cục đẩy công suất hoặc amply chuyên dụng trên thị trường. Sự ổn định trong mạch phân tần giúp loa bảo vệ tối đa các driver bên trong, hạn chế tình trạng cháy loa khi hoạt động ở cường độ cao.
        - heading "Kết hợp hoàn hảo cho một dàn karaoke đẳng cấp" [level=2] [ref=e147]
        - paragraph [ref=e148]: Để khai thác hết nguồn năng lượng mạnh mẽ từ loa BMB CSE-312-SE, việc xây dựng một hệ thống âm thanh đồng bộ là điều vô cùng cần thiết. Một dàn karaoke tiêu chuẩn cao cấp không thể thiếu sự góp mặt của các thiết bị bổ trợ chuyên sâu.
        - list [ref=e149]:
          - listitem [ref=e150]:
            - strong [ref=e151]: "Micro và Mixer:"
            - text: Trái tim điều phối giọng hát, giúp lọc sạch tạp âm và đưa tín hiệu âm thanh mượt mà nhất đến loa.
          - listitem [ref=e152]:
            - strong [ref=e153]: "Equalizer và Phân tầng crossover:"
            - text: Giúp can thiệp sâu vào các dải tần số, cắt bỏ những tần số thừa, tôn lên những dải âm đẹp nhất của cả nhạc nền và giọng hát.
          - listitem [ref=e154]:
            - strong [ref=e155]: "Thiết bị Chống hu:"
            - text: Bảo vệ đôi tai của bạn và độ bền của loa treble khỏi những tiếng rít chói tai khó chịu trong quá trình ca hát.
        - paragraph [ref=e156]: Bên cạnh phần nghe, phần nhìn cũng đóng vai trò khơi nguồn cảm xúc thăng hoa. Không gian giải trí của bạn sẽ thực sự biến thành một sân khấu chuyên nghiệp khi được tô điểm bởi ánh sáng lung linh từ hệ thống Led, đèn màu và đèn nhím màu quét theo nhịp điệu âm nhạc. Sự hòa quyện giữa âm thanh đỉnh cao và ánh sáng huyền ảo sẽ kích thích mọi giác quan, đưa bạn vào không gian lễ hội âm nhạc thực thụ ngay tại nhà.
        - heading "Giải pháp thiết kế và lắp đặt hệ thống âm thanh ánh sáng chuyên nghiệp" [level=2] [ref=e157]
        - paragraph [ref=e158]: Một bộ loa hay chỉ thực sự tỏa sáng khi được đặt đúng vị trí và được căn chỉnh bởi những bàn tay am hiểu kỹ thuật âm học. Hiểu được điều đó, chúng tôi mang đến những giải pháp toàn diện từ khâu lên ý tưởng đến hoàn thiện.
        - paragraph [ref=e159]: Dịch vụ thiết kế hệ thống âm thanh ánh sáng sẽ khảo sát chi tiết không gian phòng hát của bạn, tính toán độ dội âm để đưa ra phương án bố trí loa tối ưu nhất. Tiếp theo, quá trình thi công, lắp đặt hệ thống âm thanh ánh sáng được thực hiện nhanh chóng, an toàn và đảm bảo tính thẩm mỹ cao nhất cho ngôi nhà.
        - paragraph [ref=e160]: Không chỉ dừng lại ở đó, để hệ thống luôn vận hành trơn tru và bền bỉ theo năm tháng, dịch vụ bảo trì hệ thống âm thanh ánh sáng định kỳ sẽ luôn đồng hành cùng bạn, hỗ trợ cân chỉnh âm thanh, vệ sinh thiết bị và khắc phục sự cố kịp thời.
        - heading "Sở hữu âm thanh đỉnh cao cùng Điện máy Trần Quang" [level=2] [ref=e161]
        - paragraph [ref=e162]: Nếu bạn đang tìm kiếm một giải pháp âm thanh gia đình hoặc kinh doanh chuyên nghiệp, hãy để chúng tôi đồng hành cùng đam mê của bạn. Với cam kết cung cấp các thiết bị âm thanh chính hãng, chất lượng vượt trội cùng dịch vụ chăm sóc khách hàng tận tâm, Điện máy Trần Quang tự hào là điểm đến tin cậy của hàng nghìn khách hàng yêu âm nhạc.
        - paragraph [ref=e163]: Hãy liên hệ ngay với chúng tôi để được tư vấn trải nghiệm thực tế dòng loa huyền thoại BMB và sở hữu giải pháp âm thanh ánh sáng hoàn hảo nhất cho không gian của bạn.
        - paragraph [ref=e164]:
          - strong [ref=e165]: Điện máy Trần Quang
          - text: "Địa chỉ: 416 Võ Văn Vân, Xã Tân Vĩnh Lộc, TP Hồ Chí Minh"
          - text: "Hotline: 0936106552"
          - text: "Điện thoại: 0936106552"
          - text: "Email: amthanhtranquang@gmail.com"
          - text: "Website:"
          - link "dienmaytranquang.com" [ref=e166] [cursor=pointer]:
            - /url: https://code4.mimadigi.vn/2026/july/tranquang_108426W/
        - link "Xem thêm" [ref=e169] [cursor=pointer]:
          - /url: javascript:;
          - img [ref=e170]
          - generic [ref=e172]: Xem thêm
          - img [ref=e173]
    - generic [ref=e177]:
      - heading "Sản phẩm cùng loại" [level=2] [ref=e179]
      - generic [ref=e182]:
        - generic [ref=e184]:
          - link "Loa BMB CSE-310-SE (Cặp)" [ref=e186] [cursor=pointer]:
            - /url: loa-bmb-cse-310-se-cap
            - img "Loa BMB CSE-310-SE (Cặp)" [ref=e187]
          - generic [ref=e188]:
            - heading "Loa BMB CSE-310-SE (Cặp)" [level=3] [ref=e189]:
              - link "Loa BMB CSE-310-SE (Cặp)" [ref=e190] [cursor=pointer]:
                - /url: loa-bmb-cse-310-se-cap
            - paragraph [ref=e191]:
              - generic [ref=e192]: Liên hệ báo giá
        - generic [ref=e194]:
          - link "Loa BMB CSE-310-II-SE (Cặp)" [ref=e196] [cursor=pointer]:
            - /url: loa-bmb-cse-310-ii-se-cap
            - img "Loa BMB CSE-310-II-SE (Cặp)" [ref=e197]
          - generic [ref=e198]:
            - heading "Loa BMB CSE-310-II-SE (Cặp)" [level=3] [ref=e199]:
              - link "Loa BMB CSE-310-II-SE (Cặp)" [ref=e200] [cursor=pointer]:
                - /url: loa-bmb-cse-310-ii-se-cap
            - paragraph [ref=e201]:
              - generic [ref=e202]: Liên hệ báo giá
        - generic [ref=e204]:
          - link "Loa BMB CSE-308-SE (Cặp)" [ref=e206] [cursor=pointer]:
            - /url: loa-bmb-cse-308-se-cap
            - img "Loa BMB CSE-308-SE (Cặp)" [ref=e207]
          - generic [ref=e208]:
            - heading "Loa BMB CSE-308-SE (Cặp)" [level=3] [ref=e209]:
              - link "Loa BMB CSE-308-SE (Cặp)" [ref=e210] [cursor=pointer]:
                - /url: loa-bmb-cse-308-se-cap
            - paragraph [ref=e211]:
              - generic [ref=e212]: Liên hệ báo giá
        - generic [ref=e214]:
          - link "Loa BMB CSD-2000-SE (Cặp)" [ref=e216] [cursor=pointer]:
            - /url: loa-bmb-csd-2000-se-cap
            - img "Loa BMB CSD-2000-SE (Cặp)" [ref=e217]
          - generic [ref=e218]:
            - heading "Loa BMB CSD-2000-SE (Cặp)" [level=3] [ref=e219]:
              - link "Loa BMB CSD-2000-SE (Cặp)" [ref=e220] [cursor=pointer]:
                - /url: loa-bmb-csd-2000-se-cap
            - paragraph [ref=e221]:
              - generic [ref=e222]: Liên hệ báo giá
        - generic [ref=e224]:
          - link "Loa BMB CSD-880-SE (Cặp)" [ref=e226] [cursor=pointer]:
            - /url: loa-bmb-csd-880-se-cap
            - img "Loa BMB CSD-880-SE (Cặp)" [ref=e227]
          - generic [ref=e228]:
            - heading "Loa BMB CSD-880-SE (Cặp)" [level=3] [ref=e229]:
              - link "Loa BMB CSD-880-SE (Cặp)" [ref=e230] [cursor=pointer]:
                - /url: loa-bmb-csd-880-se-cap
            - paragraph [ref=e231]:
              - generic [ref=e232]: Liên hệ báo giá
  - generic [ref=e233]:
    - generic [ref=e236]:
      - generic [ref=e237]:
        - link "Điện máy Trần Quang" [ref=e238] [cursor=pointer]:
          - /url: https://code4.mimadigi.vn/2026/july/tranquang_108426W/
          - img "Điện máy Trần Quang" [ref=e239]
        - generic [ref=e240]:
          - paragraph [ref=e241]:
            - generic [ref=e243]: ÂM THANH CAMAX – CHẤT ÂM HOÀN HẢO KHẲNG ĐỊNH ĐẲNG CẤP
          - paragraph [ref=e244]: Chuyên cung cấp và phân phối các thiết bị âm thanh chính hãng cho phòng phim, karaoke gia đình và dự án hội trường chuyên nghiệp. Camax cam kết mang lại giải pháp âm thanh toàn diện, đỉnh cao cùng chính sách bảo hành dài hạn vượt trội.
        - paragraph [ref=e245]: Theo dõi chúng tôi tại
        - generic [ref=e246]:
          - link "Facebook" [ref=e247] [cursor=pointer]:
            - /url: ""
            - img "Facebook" [ref=e248]
          - link "Instargam" [ref=e249] [cursor=pointer]:
            - /url: ""
            - img "Instargam" [ref=e250]
          - link "Tiktok" [ref=e251] [cursor=pointer]:
            - /url: ""
            - img "Tiktok" [ref=e252]
      - generic [ref=e253]:
        - paragraph [ref=e254]: Thông tin công ty
        - paragraph [ref=e256]:
          - strong [ref=e257]:
            - generic [ref=e258]: CÔNG TY SX-TM-DV-KỸ THUẬT ÂM THANH - ÁNH SÁNG TRẦN QUANG
          - generic [ref=e259]:
            - text: "MST: 0319306507"
            - text: "Địa chỉ: 416 Võ Văn Vân, Xã Tân Vĩnh Lộc, Thành phố Hồ Chí Minh, Việt Nam"
            - text: "Email:"
            - link "amthanhtranquang@gmail.com" [ref=e260] [cursor=pointer]:
              - /url: mailto:amthanhtranquang@gmail.com
            - text: "Số TK: 319306507 ( MB bank ) – CN Vĩnh Lộc, TP HCM"
            - text: "Số ĐT: 0962 719 686"
            - text: "Người đại diện: TRẦN THANH QUANG"
      - generic [ref=e261]:
        - paragraph [ref=e262]: Về chúng tôi
        - list [ref=e263]:
          - listitem [ref=e264]:
            - link "Giới thiệu" [ref=e265] [cursor=pointer]:
              - /url: gioi-thieu
          - listitem [ref=e266]:
            - link "Sản phẩm" [ref=e267] [cursor=pointer]:
              - /url: san-pham
          - listitem [ref=e268]:
            - link "Dịch vụ" [ref=e269] [cursor=pointer]:
              - /url: dich-vu
          - listitem [ref=e270]:
            - link "Dự án" [ref=e271] [cursor=pointer]:
              - /url: du-an
          - listitem [ref=e272]:
            - link "Tài liệu kỹ thuật" [ref=e273] [cursor=pointer]:
              - /url: tai-lieu-ky-thuat
          - listitem [ref=e274]:
            - link "Tin tức & sự kiện" [ref=e275] [cursor=pointer]:
              - /url: tin-tuc-va-su-kien
          - listitem [ref=e276]:
            - link "Liên hệ" [ref=e277] [cursor=pointer]:
              - /url: lien-he
      - generic [ref=e278]:
        - paragraph [ref=e279]: Chính sách
        - list [ref=e280]:
          - listitem [ref=e281]:
            - link "Hướng dẫn sử dụng" [ref=e282] [cursor=pointer]:
              - /url: huong-dan-su-dung
          - listitem [ref=e283]:
            - link "Chính sách vận chuyển" [ref=e284] [cursor=pointer]:
              - /url: chinh-sach-van-chuyen
          - listitem [ref=e285]:
            - link "Chính sách đổi trả" [ref=e286] [cursor=pointer]:
              - /url: chinh-sach-doi-tra
          - listitem [ref=e287]:
            - link "Chính sách thanh toán" [ref=e288] [cursor=pointer]:
              - /url: chinh-sach-thanh-toan
          - listitem [ref=e289]:
            - link "Chính sách hậu mãi" [ref=e290] [cursor=pointer]:
              - /url: chinh-sach-hau-mai
          - listitem [ref=e291]:
            - link "Chính sách bảo mật" [ref=e292] [cursor=pointer]:
              - /url: chinh-sach-bao-mat
          - listitem [ref=e293]:
            - link "Chính sách bảo hành" [ref=e294] [cursor=pointer]:
              - /url: chinh-sach-bao-hanh
    - generic [ref=e297]: "Công ty TNHH SX-TM-DV-KỸ THUẬT ÂM THANH ÁNH SÁNG TRẦN QUAN - Giấy phép ĐKKD/Mã số thuế: 0319306507"
    - generic [ref=e300]:
      - generic [ref=e301]: Copyright ©2026 ĐIỆN MÁY TRẦN QUANG. Thiết kế Web MIMA
      - generic [ref=e302]:
        - generic [ref=e303]:
          - text: "Đang online:"
          - generic [ref=e304]: "140"
        - generic [ref=e305]: "|"
        - generic [ref=e306]:
          - text: "Hôm nay:"
          - generic [ref=e307]: "38"
        - generic [ref=e308]: "|"
        - generic [ref=e309]:
          - text: "Tổng truy cập:"
          - generic [ref=e310]: "577"
  - generic [ref=e311]:
    - 'link "Call me: 0936106552" [ref=e312] [cursor=pointer]':
      - /url: tel:0936106552
      - img [ref=e316]
      - generic [ref=e319]: "Call me: 0936106552"
    - 'link "Zalo: 0936106552" [ref=e320] [cursor=pointer]':
      - /url: https://zalo.me/0936106552
      - img [ref=e324]
      - generic [ref=e325]: "Zalo: 0936106552"
```

# Test source

```ts
  4   | import * as fs from 'fs';
  5   | import { UiPage } from '../pages/ui/UiPage';
  6   | import { FigmaService } from '../services/FigmaService';
  7   | import { VisualAnnotator } from '../services/VisualAnnotator';
  8   | import { GeminiVision } from '../services/GeminiVision';
  9   | import { UiSectionTestData } from '../../data/ui/uiTypes';
  10  | 
  11  | export class UiVisualHelper {
  12  |     private static figmaService = new FigmaService();
  13  | 
  14  |     static async runVisualComparison(
  15  |         page: Page,
  16  |         uiPage: UiPage,
  17  |         data: UiSectionTestData,
  18  |         testInfo: TestInfo
  19  |     ) {
  20  |         const FILE_KEY = process.env.UI_TEST_FIGMA_FILE_KEY || '';
  21  |         const BASE_URL = (process.env.BASE_URL || '').replace(/\/$/, '');
  22  | 
  23  |         // ── Kiểm tra cấu hình ──
  24  |         if (!FILE_KEY || !BASE_URL) {
  25  |             test.skip(!FILE_KEY, 'Thiếu UI_TEST_FIGMA_FILE_KEY trong .env');
  26  |             test.skip(!BASE_URL, 'Thiếu BASE_URL trong .env');
  27  |             return;
  28  |         }
  29  | 
  30  |         // ── Skip nếu không match được Figma frame ──
  31  |         if (!data.figmaNodeId) {
  32  |             test.skip(true, `Không tìm được Figma frame cho "${data.sectionName}" (matchScore: ${data.matchScore}). Hãy thêm vào uiManualConfig.ts`);
  33  |             return;
  34  |         }
  35  | 
  36  |         const fullUrl = `${BASE_URL}${data.path}`;
  37  | 
  38  |         // Thư mục lưu ảnh diff cho test này
  39  |         const diffDir = path.join(testInfo.outputDir, 'visual-diff');
  40  | 
  41  |         // ── Step 1: Tải ảnh Figma và Xử lý ──
  42  |         const safeNodeId = data.figmaNodeId!.replace(/[^a-z0-9]/gi, '_');
  43  |         const downloadedFigmaImagePath = path.join(testInfo.project.outputDir, `${safeNodeId}_figma.png`);
  44  |         const finalFigmaImagePath = path.join(diffDir, `${data.sectionName.replace(/[^a-z0-9]/gi, '_')}_figma_expected.png`);
  45  | 
  46  |         await test.step('1. Tải ảnh thiết kế từ Figma', async () => {
  47  |             // Tải từ Figma (có cơ chế cache và mutex trong FigmaService)
  48  |             await this.figmaService.downloadSnapshot(FILE_KEY, data.figmaNodeId!, downloadedFigmaImagePath);
  49  | 
  50  |             if (!fs.existsSync(diffDir)) fs.mkdirSync(diffDir, { recursive: true });
  51  | 
  52  |             fs.copyFileSync(downloadedFigmaImagePath, finalFigmaImagePath);
  53  | 
  54  |             await allure.attachment('Figma Expected', fs.readFileSync(finalFigmaImagePath), 'image/png');
  55  |         });
  56  | 
  57  |         // ── Step 2: Chụp ảnh web ──
  58  |         const actualImagePath = path.join(diffDir, `${data.sectionName.replace(/[^a-z0-9]/gi, '_')}_actual.png`);
  59  |         await test.step(`2. Chụp ảnh section "${data.sectionName}" trên web`, async () => {
  60  |             const locator = await uiPage.gotoSection(fullUrl, data.selector);
  61  |             await uiPage.hideDynamicElements();
  62  |             await uiPage.prepareForScreenshot();
  63  | 
  64  |             const isVisible = await locator.isVisible({ timeout: 10000 }).catch(() => false);
  65  |             if (!isVisible) {
  66  |                 throw new Error(`Không tìm thấy element "${data.selector}" trên trang ${fullUrl}`);
  67  |             }
  68  | 
  69  |             await page.screenshot({
  70  |                 path: actualImagePath,
  71  |                 fullPage: true,
  72  |                 animations: 'disabled'
  73  |             });
  74  |             await allure.attachment('Web Actual', fs.readFileSync(actualImagePath), 'image/png');
  75  |         });
  76  | 
  77  |         // ── Step 3: So sánh + Annotate ──
  78  |         let aiResult: { pass: boolean, reason: string, issues?: Array<{ description: string, web_box_2d: [number, number, number, number], figma_box_2d: [number, number, number, number] }> };
  79  |         await test.step('3. Phân tích ngữ cảnh với Gemini AI', async () => {
  80  |             const gemini = new GeminiVision();
  81  |             aiResult = await gemini.compareImages(finalFigmaImagePath, actualImagePath);
  82  |             await allure.parameter('AI Pass', String(aiResult.pass));
  83  |             await allure.attachment('AI Reason', Buffer.from(aiResult.reason, 'utf-8'), 'text/plain');
  84  | 
  85  |             if (!aiResult.pass && aiResult.issues && aiResult.issues.length > 0) {
  86  |                 const snippetResults = await VisualAnnotator.annotateAiDifferences(
  87  |                     finalFigmaImagePath,
  88  |                     actualImagePath,
  89  |                     diffDir,
  90  |                     data.sectionName,
  91  |                     aiResult.issues
  92  |                 );
  93  | 
  94  |                 let idx = 1;
  95  |                 for (const snippet of snippetResults) {
  96  |                     await allure.attachment(`Lỗi ${idx}: ${snippet.description.substring(0, 30)}...`, fs.readFileSync(snippet.outputPath), 'image/png');
  97  |                     idx++;
  98  |                 }
  99  |                 aiResult.reason += `\nĐã đính kèm ${snippetResults.length} ảnh chi tiết lỗi vào báo cáo.`;
  100 |             }
  101 |         });
  102 | 
  103 |         await test.step('4. Kiểm tra kết quả AI', async () => {
> 104 |             expect(aiResult!.pass, `AI báo lỗi: ${aiResult!.reason}`).toBe(true);
      |                                                                       ^ Error: AI báo lỗi: Giao diện Web thực tế bị lỗi cấu trúc nghiêm trọng khi thiếu hoàn toàn khối 'Thông số kỹ thuật' ở bên phải, khiến phần 'Chi tiết sản phẩm' bị dãn tràn toàn bộ chiều rộng. Ngoài ra, còn thiếu thông tin 'Mã sp' dưới tiêu đề và các icon trong ô nhập liệu tư vấn bị lỗi hiển thị thành ô vuông rỗng.
  105 |         });
  106 |     }
  107 | }
  108 | 
```