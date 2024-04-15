export function formatDate(inputDate) {
    if (!inputDate) return '';
    // Chuyển đổi chuỗi đầu vào thành đối tượng Date
    const date = new Date(inputDate);

    // Tách các thành phần của ngày tháng
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lưu ý: getMonth() trả về 0-11
    const year = date.getFullYear();

    // Tạo định dạng mới 'DD/MM/YYYY'
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}

export function formatContractCode() {
    const date = new Date();  // Lấy ngày hiện tại
    let day = date.getDate();  // Lấy ngày trong tháng (1-31)
    let month = date.getMonth() + 1;  // Lấy tháng (0-11) và cộng thêm 1 để có giá trị từ 1-12
    let year = date.getFullYear().toString().slice(-2);  // Lấy 2 chữ số cuối của năm

    // Đảm bảo ngày và tháng có 2 chữ số bằng cách thêm '0' nếu cần
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return `${day}${month}${year}`;  // Trả về chuỗi định dạng DDMMYY
}