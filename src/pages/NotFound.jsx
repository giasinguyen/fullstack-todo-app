import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="mb-4">Trang bạn tìm không tồn tại.</p>
      <Link to="/" className="text-blue-500 underline">
        Quay về trang chủ
      </Link>
    </div>
  );
}
