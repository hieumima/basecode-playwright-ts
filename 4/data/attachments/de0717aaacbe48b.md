# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web/contract.spec.ts >> Contract Feature Tests >> Submit form successfully with valid data
- Location: tests/web/contract.spec.ts:75:9

# Error details

```
Error: page.goto: net::ERR_ABORTED at https://code4.mimadigi.vn/2026/july/tranquang_108426W/madmin/login
Call log:
  - navigating to "https://code4.mimadigi.vn/2026/july/tranquang_108426W/madmin/login", waiting until "load"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - link "Điện máy Trần Quang" [ref=e6] [cursor=pointer]:
        - /url: https://code4.mimadigi.vn/2026/july/tranquang_108426W/
        - img "Điện máy Trần Quang" [ref=e7]
      - generic [ref=e8]:
        - paragraph [ref=e9]: Công ty SX-TM-DV-KỸ THUẬT
        - paragraph [ref=e10]: ÂM THANH - ÁNH SÁNG
    - generic [ref=e12]:
      - button "Tìm kiếm" [ref=e13] [cursor=pointer]:
        - img [ref=e14]
      - textbox [ref=e15]
    - generic [ref=e17]:
      - generic [ref=e20]:
        - generic [ref=e21]: Hotline 1
        - link "0936106552" [ref=e22] [cursor=pointer]:
          - /url: tel:0936106552
      - generic [ref=e25]:
        - generic [ref=e26]: Hotline 2
        - link "0936106552" [ref=e27] [cursor=pointer]:
          - /url: tel:0936106552
  - generic [ref=e32]:
    - link "Danh Mục sản phẩm" [ref=e34] [cursor=pointer]:
      - /url: javascript:;
      - img [ref=e35]
      - generic [ref=e40]: Danh Mục sản phẩm
    - list [ref=e41]:
      - listitem [ref=e42]:
        - link "Trang chủ" [ref=e43] [cursor=pointer]:
          - /url: ""
      - listitem [ref=e44]:
        - link "Giới thiệu" [ref=e45] [cursor=pointer]:
          - /url: gioi-thieu
      - listitem [ref=e46]:
        - link "Dịch vụ" [ref=e47] [cursor=pointer]:
          - /url: dich-vu
          - text: Dịch vụ
      - listitem [ref=e49]:
        - link "Dự án" [ref=e50] [cursor=pointer]:
          - /url: du-an
      - listitem [ref=e51]:
        - link "Tài liệu kỹ thuật" [ref=e52] [cursor=pointer]:
          - /url: tai-lieu-ky-thuat
      - listitem [ref=e53]:
        - link "Tin tức & Sự kiện" [ref=e54] [cursor=pointer]:
          - /url: tin-tuc-va-su-kien
      - listitem [ref=e55]:
        - link "Liên hệ" [ref=e56] [cursor=pointer]:
          - /url: lien-he
  - link [ref=e62] [cursor=pointer]:
    - /url: ""
  - generic [ref=e64]:
    - generic [ref=e67]:
      - generic:
        - generic:
          - heading "Về chúng tôi" [level=2]
        - heading "CÔNG TY TNHH SX - TM - DV - KỸ THUẬT ÂM THANH - ÁNH SÁNG TRẦN QUANG" [level=3]
        - generic:
          - paragraph: CÔNG TY TNHH SX - TM - DV - KỸ THUẬT ÂM THANH - ÁNH SÁNG TRẦN QUANG là đơn vị chuyên cung cấp thiết bị âm thanh, ánh sáng và giải pháp thi công hệ thống âm thanh ánh sáng trọn gói tại TP. Hồ Chí Minh. Với đội ngũ kỹ thuật giàu kinh nghiệm, công ty mang đến các dịch vụ thiết kế, thi công, lắp đặt và bảo trì hệ thống âm thanh ánh sáng cho trường học, hội trường, phòng họp, sân khấu, quán karaoke, nhà hàng, khách sạn, quán bar và nhiều công trình khác.
          - paragraph: Bên cạnh đó, Trần Quang còn phân phối đa dạng các thiết bị như loa, micro, mixer, equalizer, chống hú, crossover, dàn karaoke cùng hệ thống đèn LED và đèn chiếu sáng trong nhà, ngoài trời. Cam kết chất lượng sản phẩm, thi công đúng kỹ thuật và dịch vụ hậu mãi tận tâm, Trần Quang luôn hướng đến việc mang lại giải pháp âm thanh – ánh sáng tối ưu, hiện đại và đáp ứng mọi nhu cầu của khách hàn
        - generic:
          - link "Hồ sơ năng lực":
            - /url: upload/file/menu-massage-luna-spa-1-3451-5678-2652.pdf
        - link "Xem thêm":
          - /url: gioi-thieu
          - img
          - generic: Xem thêm
          - img
      - generic:
        - paragraph
    - generic:
      - generic:
        - generic:
          - generic:
            - generic:
              - paragraph: 2000 +
              - generic: Khách hàng hài lòng
          - generic:
            - generic:
              - paragraph: 1000 +
              - generic: Dự án thành công
          - generic:
            - generic:
              - paragraph: 50 +
              - generic: Đối tác đồng hành
          - generic:
            - generic:
              - paragraph: 15 +
              - generic: Năm kinh nghiệm
    - generic [ref=e69]:
      - heading "Danh mục sản phẩm" [level=2] [ref=e71]
      - generic [ref=e72]:
        - generic:
          - generic:
            - link "Hệ thống âm thanh":
              - /url: he-thong-am-thanh
              - paragraph
              - heading "Hệ thống âm thanh" [level=3]
            - link "Hệ thống chiếu sáng sân khấu trong nhà":
              - /url: he-thong-chieu-sang-san-khau-trong-nha
              - paragraph
              - heading "Hệ thống chiếu sáng sân khấu trong nhà" [level=3]
            - link "Hệ thống chiếu sáng ngoài trời":
              - /url: he-thong-chieu-sang-ngoai-troi
              - paragraph
              - heading "Hệ thống chiếu sáng ngoài trời" [level=3]
    - generic:
      - generic:
        - generic:
          - heading "Sản phẩm HOT" [level=2]
    - generic [ref=e74]:
      - heading "Tại sao chọn chúng tôi" [level=2] [ref=e76]
      - generic [ref=e77]:
        - generic:
          - generic:
            - paragraph
            - heading "Đội ngũ" [level=3]
            - paragraph: Sở hữu đội ngũ kỹ thuật viên được đào tạo chuyên sâu, nhiều năm kinh nghiệm.
        - generic:
          - generic:
            - paragraph
            - heading "Thiết bị" [level=3]
            - paragraph: Cam kết cung cấp thiết bị chất lượng cao từ các thương hiệu uy tín, tư vấn giải pháp phù hợp.
        - generic:
          - generic:
            - paragraph
            - heading "Giải Pháp" [level=3]
            - paragraph: Luôn tư vấn giải pháp phù hợp với nhu cầu và ngân sách của từng khách hàng.
        - generic:
          - generic:
            - paragraph
            - heading "Bảo Hành" [level=3]
            - paragraph: Chính sách bảo hành minh bạch, bảo trì định kỳ và hỗ trợ kỹ thuật kịp thời.
    - generic [ref=e79]:
      - heading "Tin tức & Sự kiện" [level=2] [ref=e81]
      - generic [ref=e82]:
        - generic [ref=e83]:
          - generic:
            - paragraph:
              - link "Các Công Nghệ Mới Đang Thay Đổi Ngành Âm Thanh Hiện Nay":
                - /url: cac-cong-nghe-moi-dang-thay-doi-nganh-am-thanh-hien-nay
            - generic:
              - heading "Các Công Nghệ Mới Đang Thay Đổi Ngành Âm Thanh Hiện Nay" [level=3]:
                - link "Các Công Nghệ Mới Đang Thay Đổi Ngành Âm Thanh Hiện Nay":
                  - /url: cac-cong-nghe-moi-dang-thay-doi-nganh-am-thanh-hien-nay
              - paragraph: Sự kết hợp này mang lại dải Âm Thanh mượt mà, loại bỏ hoàn toàn hiện tượng méo tiếng hay suy hao tín hiệu trên các đường truyền dài, giúp người nghe cảm nhận trọn vẹn từng hơi thở của người ca sĩ.
              - link "Xem thêm bài viết":
                - /url: cac-cong-nghe-moi-dang-thay-doi-nganh-am-thanh-hien-nay
                - text: Xem thêm bài viết
                - img
        - generic [ref=e84]:
          - generic:
            - paragraph:
              - link "Làm Sao Để Hệ Thống Âm Thanh Hoạt Động Ổn Định?":
                - /url: lam-sao-de-he-thong-am-thanh-hoat-dong-on-dinh
            - generic:
              - heading "Làm Sao Để Hệ Thống Âm Thanh Hoạt Động Ổn Định?" [level=3]:
                - link "Làm Sao Để Hệ Thống Âm Thanh Hoạt Động Ổn Định?":
                  - /url: lam-sao-de-he-thong-am-thanh-hoat-dong-on-dinh
              - paragraph: Một hệ thống âm thanh hoạt động ổn định không chỉ là thước đo của sự chuyên nghiệp, mà còn là chiếc cầu nối giữ chân cảm xúc của người nghe. Dù là một phòng trà ấm cúng, một sân khấu sự kiện sôi động hay một dàn karaoke gia đình, sự mượt mà trong từng nốt nhạc chính là chìa khóa tạo nên sự kết nối vô hình giữa người biểu diễn và khán giả.
              - link "Xem thêm bài viết":
                - /url: lam-sao-de-he-thong-am-thanh-hoat-dong-on-dinh
                - text: Xem thêm bài viết
                - img
        - generic [ref=e85]:
          - generic:
            - paragraph:
              - link "Khi Nào Nên Thay Mới Thiết Bị Âm Thanh?":
                - /url: khi-nao-nen-thay-moi-thiet-bi-am-thanh
            - generic:
              - heading "Khi Nào Nên Thay Mới Thiết Bị Âm Thanh?" [level=3]:
                - link "Khi Nào Nên Thay Mới Thiết Bị Âm Thanh?":
                  - /url: khi-nao-nen-thay-moi-thiet-bi-am-thanh
              - paragraph: Âm nhạc là sợi dây vô hình kết nối tâm hồn, xoa dịu những mệt mỏi và khơi nguồn cho những cảm xúc thăng hoa. Để tạo nên thứ phép màu kỳ diệu đó, hệ thống Thiết Bị Âm Thanh đóng vai trò như một người truyền lửa thầm lặng.
              - link "Xem thêm bài viết":
                - /url: khi-nao-nen-thay-moi-thiet-bi-am-thanh
                - text: Xem thêm bài viết
                - img
        - generic [ref=e86]:
          - generic:
            - paragraph:
              - link "Thiết Bị Ánh Sáng LED Có Tuổi Thọ Bao Lâu?":
                - /url: thiet-bi-anh-sang-led-co-tuoi-tho-bao-lau
            - generic:
              - heading "Thiết Bị Ánh Sáng LED Có Tuổi Thọ Bao Lâu?" [level=3]:
                - link "Thiết Bị Ánh Sáng LED Có Tuổi Thọ Bao Lâu?":
                  - /url: thiet-bi-anh-sang-led-co-tuoi-tho-bao-lau
              - paragraph: Khi đầu tư cho bất kỳ không gian giải trí hay sự kiện nào, câu hỏi khiến nhiều chủ đầu tư và người đam mê băn khoăn nhất chính là Thiết Bị Ánh Sáng LED có tuổi thọ bao lâu và làm thế nào để ngọn lửa ánh sáng ấy luôn rực cháy bền bỉ cùng thời gian.
              - link "Xem thêm bài viết":
                - /url: thiet-bi-anh-sang-led-co-tuoi-tho-bao-lau
                - text: Xem thêm bài viết
                - img
        - generic [ref=e87]:
          - generic:
            - paragraph:
              - link "Hệ Thống Âm Thanh Có Tiêu Hao Điện Năng Nhiều Không?":
                - /url: he-thong-am-thanh-co-tieu-hao-dien-nang-nhieu-khong
            - generic:
              - heading "Hệ Thống Âm Thanh Có Tiêu Hao Điện Năng Nhiều Không?" [level=3]:
                - link "Hệ Thống Âm Thanh Có Tiêu Hao Điện Năng Nhiều Không?":
                  - /url: he-thong-am-thanh-co-tieu-hao-dien-nang-nhieu-khong
              - paragraph: Nhưng với những người sở hữu hoặc đang có ý định đầu tư một hệ thống âm thanh chất lượng cho gia đình hay phòng kinh doanh, câu hỏi về mức độ tiêu thụ điện năng luôn là một nỗi băn khoăn rất thực tế. Liệu niềm đam mê âm nhạc hay việc vận hành một không gian giải trí có đi kèm với một hóa đơn tiền điện khổng lồ.
              - link "Xem thêm bài viết":
                - /url: he-thong-am-thanh-co-tieu-hao-dien-nang-nhieu-khong
                - text: Xem thêm bài viết
                - img
        - generic [ref=e88]:
          - generic:
            - paragraph:
              - link "Micro Không Dây Có Phù Hợp Cho Hội Nghị Không?":
                - /url: micro-khong-day-co-phu-hop-cho-hoi-nghi-khong
            - generic:
              - heading "Micro Không Dây Có Phù Hợp Cho Hội Nghị Không?" [level=3]:
                - link "Micro Không Dây Có Phù Hợp Cho Hội Nghị Không?":
                  - /url: micro-khong-day-co-phu-hop-cho-hoi-nghi-khong
              - paragraph: Hiện tại, các dòng micro không dây cao cấp sử dụng băng tần UHF (Ultra High Frequency) với khả năng tự động dò tìm và khóa tần số sạch, tránh hoàn toàn hiện tượng trùng kênh hay nhiễu sóng từ các thiết bị thông minh khác.
              - link "Xem thêm bài viết":
                - /url: micro-khong-day-co-phu-hop-cho-hoi-nghi-khong
                - text: Xem thêm bài viết
                - img
    - generic [ref=e90]:
      - generic [ref=e91]:
        - generic:
          - paragraph
        - generic:
          - generic:
            - heading "Câu hỏi thường gặp" [level=2]
          - generic:
            - generic:
              - heading "Điện máy Trần Quang cung cấp những dịch vụ nào?" [level=3]:
                - button "Điện máy Trần Quang cung cấp những dịch vụ nào?"
            - generic:
              - heading "Điện máy Trần Quang cung cấp những thiết bị âm thanh và ánh sáng nào?" [level=3]:
                - button "Điện máy Trần Quang cung cấp những thiết bị âm thanh và ánh sáng nào?"
            - generic:
              - heading "Chi phí thi công hệ thống âm thanh ánh sáng được tính như thế nào?" [level=3]:
                - button "Chi phí thi công hệ thống âm thanh ánh sáng được tính như thế nào?"
            - generic:
              - heading "Khi nào cần bảo trì hệ thống âm thanh ánh sáng?" [level=3]:
                - button "Khi nào cần bảo trì hệ thống âm thanh ánh sáng?"
      - generic [ref=e94]:
        - paragraph [ref=e95]:
          - text: Tìm kiếm một đơn vị cung ứng và thi công âm thanh, ánh sáng uy tín luôn là bài toán đau đầu của các chủ đầu tư phòng karaoke, quán bar, hội trường hay gia đình. Với nhiều năm kinh nghiệm thực chiến trong ngành,
          - strong [ref=e96]: Điện máy Trần Quang
          - text: tự hào là đối tác tin cậy mang đến các giải pháp toàn diện từ cung cấp thiết bị chính hãng đến thiết kế, thi công trọn gói. Chúng tôi cam kết tối ưu hóa chi phí và đem lại trải nghiệm âm thanh, ánh sáng đỉnh cao cho mọi công trình.
        - heading "Công ty TNHH SX - TM - DV - Kỹ thuật Âm thanh - Ánh sáng Trần Quang" [level=2] [ref=e97]
        - paragraph [ref=e98]: Công ty TNHH SX - TM - DV - Kỹ thuật Âm thanh - Ánh sáng Trần Quang là một trong những đơn vị tiên phong tại khu vực miền Nam chuyên phân phối, thiết kế và thi công lắp đặt hệ thống âm thanh nghệ thuật, ánh sáng sân khấu chuyên nghiệp. Được biết đến rộng rãi với thương hiệu Điện máy Trần Quang, chúng tôi định vị giá trị thương hiệu bằng sự tử tế, năng lực kỹ thuật chuyên sâu và chế độ hậu mãi chu đáo.
        - paragraph [ref=e99]: Khác biệt với các đơn vị thương mại đơn thuần, Trần Quang sở hữu đội ngũ kỹ sư âm thanh (Sound Engineer) và kỹ thuật viên ánh sáng dày dạn kinh nghiệm. Chúng tôi không chỉ bán thiết bị, chúng tôi đem đến giải pháp âm học và giải pháp ánh sáng được may đo riêng biệt cho từng không gian diện tích, từ căn hộ gia đình ấm cúng cho đến các trung tâm tiệc cưới, hội trường, quán bar có quy mô hàng nghìn khách.
        - heading "Thiết bị âm thanh chuyên nghiệp tại Điện máy Trần Quang" [level=2] [ref=e100]
        - paragraph [ref=e101]: Để cấu thành một hệ thống âm thanh hay, độ bền cao và hoạt động ổn định ở cường độ lớn, sự đồng bộ và chất lượng của từng linh kiện là yếu tố quyết định. Tại Điện máy Trần Quang, danh mục sản phẩm âm thanh được tuyển chọn kỹ lưỡng từ các thương hiệu hàng đầu thế giới và các dòng sản phẩm tự sản xuất, lắp ráp theo tiêu chuẩn khắt khe.
        - heading "Hệ thống loa và dàn karaoke cao cấp" [level=3] [ref=e102]
        - paragraph [ref=e103]: "Loa được ví như \"cột sống\" của mọi hệ thống âm thanh, là nơi tái hiện trực tiếp dao động âm nhạc đến tai người nghe. Chúng tôi cung cấp đa dạng các dòng loa:"
        - list [ref=e104]:
          - listitem [ref=e105]:
            - strong [ref=e106]: "Loa Full-range (Loa toàn dải):"
            - text: Đáp ứng dải tần rộng, thể hiện trung thực giọng hát và nhạc cụ, phù hợp cho phòng karaoke chuyên nghiệp, phòng trà acoustic.
          - listitem [ref=e107]:
            - strong [ref=e108]: "Loa Subwoofer (Loa siêu trầm):"
            - text: Tái tạo dải tần thấp sâu lắng, uy lực, tạo độ dày cho âm nhạc. Trần Quang cung cấp cả dòng sub hơi công suất lớn cho sân khấu và sub điện tiện lợi cho gia đình.
          - listitem [ref=e109]:
            - strong [ref=e110]: "Dàn karaoke nguyên bộ:"
            - text: Được đội ngũ kỹ thuật phối ghép sẵn dựa trên các tính toán vật lý âm học, đảm bảo công suất của cục đẩy công suất (main) hoàn toàn tương thích với trở kháng và công suất chịu đựng của loa, giúp loại bỏ nguy cơ cháy hỏng và phát huy tối đa chất âm.
        - heading "Thiết bị xử lý tín hiệu chuyên sâu" [level=3] [ref=e111]
        - paragraph [ref=e112]: "Nếu loa là cơ bắp thì các thiết bị xử lý tín hiệu chính là bộ não điều khiển toàn bộ hệ thống. Một dàn âm thanh hiện đại không thể thiếu sự hiện diện của các thiết bị sau:"
        - list [ref=e113]:
          - listitem [ref=e114]:
            - strong [ref=e115]: "Mixer (Bàn trộn âm thanh):"
            - text: Cho phép nhận nhiều nguồn tín hiệu đầu vào (micro, nhạc cụ, nhạc nền) và hiệu chỉnh âm sắc, hiệu ứng (echo, reverb) trước khi đưa ra loa. Chúng tôi cung cấp cả dòng mixer analog truyền thống với các nút vặn trực quan và mixer kỹ thuật số (digital mixer) cho phép lưu trữ và gọi lại các cấu hình tinh chỉnh chỉ bằng một nút bấm.
          - listitem [ref=e116]:
            - strong [ref=e117]: "Equalizer (Bộ lọc xì):"
            - text: Thiết bị can thiệp chi tiết vào từng dải tần số cụ thể. Nhờ có Equalizer, kỹ thuật viên có thể gọt giũa những dải tần thừa gây ù, rền, hoặc bù đắp những dải tần bị thiếu hụt do đặc thù không gian phòng hở hoặc phòng nhiều kính.
          - listitem [ref=e118]:
            - strong [ref=e119]: "Phân tầng crossover:"
            - text: Đóng vai trò phân chia dải tần số âm thanh từ nguồn phát thành các dải tần riêng biệt (cao, trung, thấp) để đưa đến đúng loại loa chuyên dụng. Điều này giúp loa treble không phải gánh dải bass (gây cháy loa) và loa bass không phải xử lý dải high (gây đục tiếng).
          - listitem [ref=e120]:
            - strong [ref=e121]: "Thiết bị chống hú (Feedback Suppressor):"
            - text: Nỗi ám ảnh lớn nhất khi hát karaoke hay tổ chức sự kiện là tiếng rít chói tai từ micro. Thiết bị chống hú tự động dò tìm các tần số cộng hưởng gây hú rít và cắt bỏ chúng một cách cực kỳ tinh tế mà không làm méo mó giọng hát tự nhiên của người dùng.
        - heading "Micro karaoke và biểu diễn chuyên nghiệp" [level=3] [ref=e122]
        - paragraph [ref=e123]: Chúng tôi cung cấp các dòng micro không dây UHF có khả năng tự động dò sóng sạch, chống nhiễu sóng từ các thiết bị di động, bán kính hoạt động rộng. Củ micro có độ nhạy cao, bắt âm tốt, hỗ trợ nâng giọng hát cho những người có giọng mỏng, yếu, đồng thời chịu được áp lực âm thanh lớn mà không bị vỡ tiếng.
        - heading "Giải pháp ánh sáng sân khấu đỉnh cao" [level=2] [ref=e124]
        - paragraph [ref=e125]: Một buổi biểu diễn hay một bữa tiệc âm nhạc sẽ mất đi một nửa linh hồn nếu thiếu đi hiệu ứng ánh sáng. Ánh sáng không chỉ để thắp sáng mà là chất xúc tác thị giác kích thích cảm xúc của người tham dự. Điện máy Trần Quang mang đến hệ thống ánh sáng hiện đại và phong phú bậc nhất hiện nay.
        - heading "Đèn LED chiếu sáng và trang trí sân khấu" [level=3] [ref=e126]
        - paragraph [ref=e127]: Công nghệ LED đã cách mạng hóa ngành ánh sáng sân khấu nhờ ưu điểm tiết kiệm điện năng, tỏa nhiệt thấp và tuổi thọ cực cao. Trần Quang cung cấp các loại đèn LED sân khấu chuyên dụng như đèn LED Par pha màu nền mượt mà, LED cob tạo ánh sáng trắng ấm tự nhiên cho các góc máy quay, hay LED thanh trang trí tạo điểm nhấn góc cạnh cho không gian phòng bay, quán bar.
        - heading "Đèn màu và đèn nhím màu tạo hiệu ứng" [level=3] [ref=e128]
        - paragraph [ref=e129]: "Để tạo nên sự sôi động cho các bản nhạc remix, dance hay vũ điệu sôi động, các dòng đèn hiệu ứng là không thể thiếu:"
        - list [ref=e130]:
          - listitem [ref=e131]:
            - strong [ref=e132]: "Đèn màu sân khấu:"
            - text: Bao gồm các dòng đèn Moving Head (đèn đầu cử động) có khả năng quét tia sáng mạnh mẽ, thay đổi màu sắc liên tục và chiếu ra các hình ảnh (gobo) nghệ thuật độc đáo lên sàn diễn và trần nhà.
          - listitem [ref=e133]:
            - strong [ref=e134]: "Đèn nhím màu (Mushroom light):"
            - text: Dòng đèn huyền thoại nhưng chưa bao giờ lỗi thời cho các phòng karaoke gia đình và sân khấu mini. Với thiết kế nhiều thấu kính lồi bao quanh, đèn nhím màu tạo ra hàng trăm luồng sáng đa sắc xoay tròn, đan xen nhau theo nhịp điệu âm nhạc, biến không gian nhỏ hẹp trở nên vô cùng lung linh và sống động.
        - heading "Dịch vụ kỹ thuật âm thanh ánh sáng trọn gói tại Trần Quang" [level=2] [ref=e135]
        - paragraph [ref=e136]: Thế mạnh vượt trội của Điện máy Trần Quang nằm ở năng lực cung cấp chuỗi dịch vụ khép kín từ khâu lên ý tưởng cho đến khi bàn giao vận hành và bảo trì trọn đời.
        - heading "Thiết kế hệ thống âm thanh ánh sáng chuyên nghiệp" [level=3] [ref=e137]
        - paragraph [ref=e138]: Mỗi công trình có một kết cấu kiến trúc, vật liệu xây dựng và mục đích sử dụng khác nhau. Một thiết kế rập khuôn sẽ dẫn đến tình trạng triệt tiêu âm thanh hoặc tạo ra những góc chết ánh sáng. Đội ngũ kỹ sư của chúng tôi sẽ tiến hành khảo sát thực địa, đo đạc kích thước và sử dụng các phần mềm mô phỏng âm học, ánh sáng chuyên dụng để lên bản vẽ 2D, 3D chi tiết.
        - paragraph [ref=e139]: Bản thiết kế này giúp khách hàng hình dung trực quan vị trí treo loa để âm thanh phủ đều mọi góc ngồi, hướng đi của đèn để không làm chói mắt người biểu diễn mà vẫn đảm bảo hiệu ứng thị giác tối đa.
        - heading "Thi công, lắp đặt hệ thống âm thanh ánh sáng đúng chuẩn" [level=3] [ref=e140]
        - paragraph [ref=e141]: "Quy trình thi công tại Trần Quang được kiểm soát nghiêm ngặt theo các tiêu chuẩn kỹ thuật an toàn điện và xây dựng:"
        - list [ref=e142]:
          - listitem [ref=e143]: Sử dụng các loại dây tín hiệu chống nhiễu cao cấp, jack cắm chính hãng để đảm bảo đường truyền tín hiệu thông suốt, không bị suy hao hay tạo tiếng xì sụp.
          - listitem [ref=e144]: Hệ thống giá treo loa, pat treo đèn được tính toán kỹ lưỡng về khả năng chịu tải, định vị bằng tắc kê sắt chuyên dụng vào dầm bê tông để đảm bảo an toàn tuyệt đối cho người ngồi phía dưới.
          - listitem [ref=e145]: Đi dây gọn gàng thẩm mỹ trong ống gen cách điện, dán nhãn phân biệt đầu dây rõ ràng để thuận tiện cho việc vận hành và nâng cấp sau này.
          - listitem [ref=e146]: Cân chỉnh âm thanh bằng thiết bị đo chuyên dụng (RTA), thiết lập giới hạn công suất (Limiter) trên các thiết bị kỹ thuật số để bảo vệ hệ thống không bị quá tải khi khách hàng sử dụng quá công suất cho phép.
        - heading "Bảo trì, bảo dưỡng hệ thống định kỳ" [level=3] [ref=e147]
        - paragraph [ref=e148]: "Các thiết bị âm thanh, ánh sáng sau một thời gian hoạt động thường bị bám bụi bẩn vào cánh quạt tản nhiệt, linh kiện bên trong dẫn đến nóng máy, giảm tuổi thọ hoặc gây ra những tiếng nổ nhỏ lẹt xẹt. Trần Quang cung cấp dịch vụ bảo trì định kỳ:"
        - list [ref=e149]:
          - listitem [ref=e150]: Vệ sinh hút bụi chi tiết bên trong thiết bị.
          - listitem [ref=e151]: Kiểm tra các mối nối, jack cắm, đo đạc lại thông số nguồn điện cấp.
          - listitem [ref=e152]: Căn chỉnh lại hệ thống âm thanh phù hợp với sự thay đổi của không gian (nếu khách hàng có thay đổi về nội thất).
          - listitem [ref=e153]: Hỗ trợ xử lý sự cố khẩn cấp 24/7 để đảm bảo hoạt động kinh doanh của khách hàng không bị gián đoạn.
        - heading "Tại sao khách hàng nên lựa chọn Điện máy Trần Quang?" [level=2] [ref=e154]
        - paragraph [ref=e155]: "Giữa hàng trăm đơn vị trên thị trường, Điện máy Trần Quang vẫn luôn khẳng định được chỗ đứng vững chắc trong lòng khách hàng nhờ vào những giá trị cốt lõi bền vững:"
        - list [ref=e156]:
          - listitem [ref=e157]:
            - strong [ref=e158]: "Chất lượng thiết bị vượt trội:"
            - text: Tất cả sản phẩm do chúng tôi cung cấp đều có nguồn gốc rõ ràng, đầy đủ hóa đơn chứng từ, nói không với hàng giả, hàng nhái kém chất lượng.
          - listitem [ref=e159]:
            - strong [ref=e160]: "Đội ngũ chuyên môn cao:"
            - text: Kỹ thuật viên của Trần Quang liên tục được đào tạo, cập nhật các công nghệ âm thanh, ánh sáng mới nhất để ứng dụng vào thực tế công trình.
          - listitem [ref=e161]:
            - strong [ref=e162]: "Chi phí tối ưu:"
            - text: Nhờ nhập khẩu trực tiếp và có xưởng sản xuất, lắp ráp phụ trợ, chúng tôi mang đến mức giá cạnh tranh nhất thị trường cùng nhiều phân khúc giá phù hợp với ngân sách đầu tư của từng khách hàng.
          - listitem [ref=e163]:
            - strong [ref=e164]: "Chính sách bảo hành vàng:"
            - text: Bảo hành nhanh chóng tận nơi, hỗ trợ cho mượn thiết bị thay thế tương đương trong thời gian chờ bảo hành để không làm ảnh hưởng đến trải nghiệm giải trí hay công việc kinh doanh của bạn.
        - paragraph [ref=e165]: Hãy để Điện máy Trần Quang đồng hành cùng bạn kiến tạo nên những không gian âm thanh đỉnh cao và ánh sáng nghệ thuật đầy cảm xúc!
        - heading "Thông tin liên hệ" [level=2] [ref=e166]
        - list [ref=e167]:
          - listitem [ref=e168]:
            - strong [ref=e169]: Điện máy Trần Quang
          - listitem [ref=e170]: "Địa chỉ: 416 Võ Văn Vân, Xã Tân Vĩnh Lộc, TP Hồ Chí Minh"
          - listitem [ref=e171]: "Hotline: 0936106552"
          - listitem [ref=e172]: "Điện thoại: 0936106552"
          - listitem [ref=e173]: "Email: amthanhtranquang@gmail.com"
          - listitem [ref=e174]:
            - text: "Website:"
            - link "dienmaytranquang.com" [ref=e175] [cursor=pointer]:
              - /url: https://code4.mimadigi.vn/2026/july/tranquang_108426W/
        - link "Xem thêm" [ref=e178] [cursor=pointer]:
          - /url: javascript:;
          - img [ref=e179]
          - generic [ref=e181]: Xem thêm
          - img [ref=e182]
  - generic [ref=e185]:
    - generic [ref=e188]:
      - generic [ref=e189]:
        - link "Điện máy Trần Quang" [ref=e190] [cursor=pointer]:
          - /url: https://code4.mimadigi.vn/2026/july/tranquang_108426W/
          - img "Điện máy Trần Quang" [ref=e191]
        - generic [ref=e192]:
          - paragraph [ref=e193]:
            - generic [ref=e195]: ÂM THANH CAMAX – CHẤT ÂM HOÀN HẢO KHẲNG ĐỊNH ĐẲNG CẤP
          - paragraph [ref=e196]: Chuyên cung cấp và phân phối các thiết bị âm thanh chính hãng cho phòng phim, karaoke gia đình và dự án hội trường chuyên nghiệp. Camax cam kết mang lại giải pháp âm thanh toàn diện, đỉnh cao cùng chính sách bảo hành dài hạn vượt trội.
        - paragraph [ref=e197]: Theo dõi chúng tôi tại
        - generic [ref=e198]:
          - link "Facebook" [ref=e199] [cursor=pointer]:
            - /url: ""
            - img "Facebook" [ref=e200]
          - link "Instargam" [ref=e201] [cursor=pointer]:
            - /url: ""
            - img "Instargam" [ref=e202]
          - link "Tiktok" [ref=e203] [cursor=pointer]:
            - /url: ""
            - img "Tiktok" [ref=e204]
      - generic [ref=e205]:
        - paragraph [ref=e206]: Thông tin công ty
        - paragraph [ref=e208]:
          - strong [ref=e209]:
            - generic [ref=e210]: CÔNG TY SX-TM-DV-KỸ THUẬT ÂM THANH - ÁNH SÁNG TRẦN QUANG
          - generic [ref=e211]:
            - text: "MST: 0319306507"
            - text: "Địa chỉ: 416 Võ Văn Vân, Xã Tân Vĩnh Lộc, Thành phố Hồ Chí Minh, Việt Nam"
            - text: "Email:"
            - link "amthanhtranquang@gmail.com" [ref=e212] [cursor=pointer]:
              - /url: mailto:amthanhtranquang@gmail.com
            - text: "Số TK: 319306507 ( MB bank ) – CN Vĩnh Lộc, TP HCM"
            - text: "Số ĐT: 0962 719 686"
            - text: "Người đại diện: TRẦN THANH QUANG"
      - generic [ref=e213]:
        - paragraph [ref=e214]: Về chúng tôi
        - list [ref=e215]:
          - listitem [ref=e216]:
            - link "Giới thiệu" [ref=e217] [cursor=pointer]:
              - /url: gioi-thieu
          - listitem [ref=e218]:
            - link "Sản phẩm" [ref=e219] [cursor=pointer]:
              - /url: san-pham
          - listitem [ref=e220]:
            - link "Dịch vụ" [ref=e221] [cursor=pointer]:
              - /url: dich-vu
          - listitem [ref=e222]:
            - link "Dự án" [ref=e223] [cursor=pointer]:
              - /url: du-an
          - listitem [ref=e224]:
            - link "Tài liệu kỹ thuật" [ref=e225] [cursor=pointer]:
              - /url: tai-lieu-ky-thuat
          - listitem [ref=e226]:
            - link "Tin tức & sự kiện" [ref=e227] [cursor=pointer]:
              - /url: tin-tuc-va-su-kien
          - listitem [ref=e228]:
            - link "Liên hệ" [ref=e229] [cursor=pointer]:
              - /url: lien-he
      - generic [ref=e230]:
        - paragraph [ref=e231]: Chính sách
        - list [ref=e232]:
          - listitem [ref=e233]:
            - link "Hướng dẫn sử dụng" [ref=e234] [cursor=pointer]:
              - /url: huong-dan-su-dung
          - listitem [ref=e235]:
            - link "Chính sách vận chuyển" [ref=e236] [cursor=pointer]:
              - /url: chinh-sach-van-chuyen
          - listitem [ref=e237]:
            - link "Chính sách đổi trả" [ref=e238] [cursor=pointer]:
              - /url: chinh-sach-doi-tra
          - listitem [ref=e239]:
            - link "Chính sách thanh toán" [ref=e240] [cursor=pointer]:
              - /url: chinh-sach-thanh-toan
          - listitem [ref=e241]:
            - link "Chính sách hậu mãi" [ref=e242] [cursor=pointer]:
              - /url: chinh-sach-hau-mai
          - listitem [ref=e243]:
            - link "Chính sách bảo mật" [ref=e244] [cursor=pointer]:
              - /url: chinh-sach-bao-mat
          - listitem [ref=e245]:
            - link "Chính sách bảo hành" [ref=e246] [cursor=pointer]:
              - /url: chinh-sach-bao-hanh
    - generic [ref=e249]: "Công ty TNHH SX-TM-DV-KỸ THUẬT ÂM THANH ÁNH SÁNG TRẦN QUAN - Giấy phép ĐKKD/Mã số thuế: 0319306507"
    - generic [ref=e252]:
      - generic [ref=e253]: Copyright ©2026 ĐIỆN MÁY TRẦN QUANG. Thiết kế Web MIMA
      - generic [ref=e254]:
        - generic [ref=e255]:
          - text: "Đang online:"
          - generic [ref=e256]: "34"
        - generic [ref=e257]: "|"
        - generic [ref=e258]:
          - text: "Hôm nay:"
          - generic [ref=e259]: "5"
        - generic [ref=e260]: "|"
        - generic [ref=e261]:
          - text: "Tổng truy cập:"
          - generic [ref=e262]: "587"
  - generic [ref=e263]:
    - 'link "Call me: 0936106552" [ref=e264] [cursor=pointer]':
      - /url: tel:0936106552
      - img [ref=e268]
      - generic [ref=e271]: "Call me: 0936106552"
    - 'link "Zalo: 0936106552" [ref=e272] [cursor=pointer]':
      - /url: https://zalo.me/0936106552
      - img [ref=e276]
      - generic [ref=e277]: "Zalo: 0936106552"
```

# Test source

```ts
  1  | import { Page, Locator, test } from "@playwright/test";
  2  | import { BasePage } from "../BasePage";
  3  | 
  4  | export class AdminLoginPage extends BasePage {
  5  |     // Locators
  6  |     readonly usernameInput: Locator;
  7  |     readonly passwordInput: Locator;
  8  |     readonly loginButton: Locator;
  9  |     readonly errorMessage: Locator;
  10 |     readonly dashboardElement: Locator;
  11 | 
  12 |     constructor(page: Page) {
  13 |         super(page);
  14 |         this.usernameInput = page.locator("//input[@id='username']");
  15 |         this.passwordInput = page.locator("//input[@id='password']");
  16 |         this.loginButton = page.locator("//button[@class='login-btn btn-login']");
  17 |         this.errorMessage = page.locator("//div[@role='alert']");
  18 |         this.dashboardElement = page.locator("//span[@class='text-split']");
  19 |     }
  20 | 
  21 |     async fillLoginForm(username?: string, password?: string) {
  22 |         await test.step(`Điền thông tin đăng nhập`, async () => {
  23 |             if (username !== undefined && username !== null && username !== "") {
  24 |                 await this.typeInto(this.usernameInput, username);
  25 |             } else if (username === "") {
  26 |                 await this.usernameInput.fill("");
  27 |             }
  28 | 
  29 |             if (password !== undefined && password !== null && password !== "") {
  30 |                 await this.typeInto(this.passwordInput, password);
  31 |             } else if (password === "") {
  32 |                 await this.passwordInput.fill("");
  33 |             }
  34 |         });
  35 |     }
  36 | 
  37 |     async gotoLoginPage() {
  38 |         const baseUrl = process.env.BASE_URL?.endsWith('/') ? process.env.BASE_URL : process.env.BASE_URL + '/';
> 39 |         await this.page.goto(baseUrl + 'madmin/login');
     |                         ^ Error: page.goto: net::ERR_ABORTED at https://code4.mimadigi.vn/2026/july/tranquang_108426W/madmin/login
  40 |     }
  41 | 
  42 |     async clickLogin() {
  43 |         await test.step("Bấm nút Đăng nhập", async () => {
  44 |             await this.clickOn(this.loginButton);
  45 |         });
  46 |     }
  47 | }
  48 | 
```