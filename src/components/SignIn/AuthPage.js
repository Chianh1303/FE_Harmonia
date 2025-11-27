import React, { useState } from "react";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showClause, setShowClause] = useState(false);
    const [agree, setAgree] = useState(false);
    const [errorAgree, setErrorAgree] = useState(false);

    const handleRegisterSubmit = (e) => {
        if (!agree) {
            e.preventDefault();
            setErrorAgree(true);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover"
            style={{
                backgroundImage:
                    'url("https://i.pinimg.com/736x/3e/39/9a/3e399adb2abb31ed1757a25e579c1ce0.jpg")',
            }}
        >
            <div className="auth-container bg-[#1c1427] p-10 rounded-2xl shadow-xl w-full max-w-md text-center"
                style={{ boxShadow: "0 0 35px rgba(184,107,255,0.25)" }}>
                
                <h2 className="text-3xl font-bold mb-3 text-purple-400">Harmonia Studio</h2>

                {/* Toggle */}
                <div className="toggle flex bg-[#261a35] rounded-lg overflow-hidden mb-6">
                    <button
                        className={`flex-1 py-3 transition ${isLogin ? "bg-purple-500 text-white" : "text-gray-400"}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Đăng nhập
                    </button>
                    <button
                        className={`flex-1 py-3 transition ${!isLogin ? "bg-purple-500 text-white" : "text-gray-400"}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Đăng ký
                    </button>
                </div>

                {/* ====================== LOGIN FORM ===================== */}
                {isLogin && (
                    <form className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="bg-[#2b1f3a] px-4 py-3 rounded-lg text-white"
                        />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className="bg-[#2b1f3a] px-4 py-3 rounded-lg text-white"
                        />
                        <div className="flex justify-between text-gray-400 text-sm mt-1">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" /> Ghi nhớ
                            </label>
                            <a href="#" className="text-purple-400 hover:underline">Quên mật khẩu?</a>
                        </div>
                        <button className="bg-purple-500 hover:bg-purple-400 py-3 rounded-lg font-semibold">
                            Đăng nhập
                        </button>
                    </form>
                )}

                {/* ====================== REGISTER FORM ===================== */}
                {!isLogin && (
                    <form className="flex flex-col gap-4" onSubmit={handleRegisterSubmit}>
                        <input
                            type="text"
                            placeholder="Họ và tên"
                            className="bg-[#2b1f3a] px-4 py-3 rounded-lg text-white"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="bg-[#2b1f3a] px-4 py-3 rounded-lg text-white"
                        />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className="bg-[#2b1f3a] px-4 py-3 rounded-lg text-white"
                        />
                        <input
                            type="password"
                            placeholder="Xác nhận mật khẩu"
                            className="bg-[#2b1f3a] px-4 py-3 rounded-lg text-white"
                        />

                        {/* Checkbox */}
                        <div className="text-left text-gray-300 text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agree}
                                    onChange={() => setAgree(!agree)}
                                />
                                Tôi đồng ý với
                                <span
                                    className="text-blue-400 underline cursor-pointer"
                                    onClick={() => setShowClause(true)}
                                >
                                    Điều khoản & Chính sách
                                </span>
                            </label>
                            {errorAgree && (
                                <p className="text-red-400 mt-1 text-sm">
                                    Bạn phải đồng ý trước khi đăng ký.
                                </p>
                            )}
                        </div>

                        <button className="bg-purple-500 hover:bg-purple-400 py-3 rounded-lg font-semibold mt-2">
                            Đăng ký
                        </button>
                    </form>
                )}
            </div>

            {/* ==================== MODAL ==================== */}
            {showClause && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-5 z-50">
                    <div className="bg-[#1c1427] max-w-3xl w-full rounded-2xl p-6 shadow-xl overflow-y-auto max-h-[80vh]">

                        <h1 className="text-3xl font-bold mb-4 text-purple-200">
                            Điều khoản & Chính sách Sử dụng Dịch vụ Nghe Nhạc
                        </h1>

                        <div className="space-y-4 text-gray-300 text-[15px] leading-relaxed">
                            <p>Chào mừng bạn đến với nền tảng âm nhạc Harmonia!</p>

                            <h2 className="text-xl font-semibold">1. Chấp nhận điều khoản</h2>
                            <p>Bằng việc tạo tài khoản hoặc nghe nhạc trên Harmonia...</p>

                            <h2 className="text-xl font-semibold">2. Tài khoản người dùng</h2>
                            <ul className="list-disc ml-6">
                                <li>Cung cấp thông tin chính xác.</li>
                                <li>Bảo mật tài khoản.</li>
                                <li>Có thể bị khóa nếu vi phạm.</li>
                            </ul>

                            <h2 className="text-xl font-semibold">3. Quyền của người dùng</h2>
                            <p>Bạn được nghe nhạc, tạo playlist,...</p>

                            <h2 className="text-xl font-semibold">4. Hạn chế</h2>
                            <ul className="list-disc ml-6">
                                <li>Không sao chép hoặc phát tán trái phép.</li>
                                <li>Không hack hệ thống.</li>
                            </ul>

                            <h2 className="text-xl font-semibold">5. Bản quyền âm nhạc</h2>
                            <p>Nội dung thuộc quyền sở hữu nghệ sĩ.</p>

                            <h2 className="text-xl font-semibold">6. Dữ liệu và riêng tư</h2>
                            <p>Thu thập email, lịch sử nghe nhạc...</p>

                            <h2 className="text-xl font-semibold">7. Premium</h2>
                            <p>Nghe không quảng cáo...</p>

                            <h2 className="text-xl font-semibold">8. Gián đoạn dịch vụ</h2>
                            <p>Có thể bị ảnh hưởng bởi sự cố mạng.</p>

                            <h2 className="text-xl font-semibold">9. Thay đổi điều khoản</h2>
                            <p>Có thể cập nhật bất kỳ lúc nào.</p>
                        </div>

                        <div className="mt-6 text-right">
                            <button
                                onClick={() => setShowClause(false)}
                                className="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
