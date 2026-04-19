import { useState } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';

const PhoneVerificationPage = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const { requestPhoneOTP, verifyPhone } = useAuth();

  const requestOTP = () => requestPhoneOTP.mutate(phone, { onSuccess: () => alert('OTP sent – check terminal console') });

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    verifyPhone.mutate({ phone, otp }, { onSuccess: () => alert('Phone verified successfully!') });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-20">
      <div className="max-w-md w-full px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Verify Phone</h1>
        <input type="tel" placeholder="+880XXXXXXXXXX" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-6 py-4 border border-gray-300 rounded-3xl mb-4" />
        <button onClick={requestOTP} className="w-full bg-black text-white py-6 text-xl font-semibold rounded-3xl mb-6">Send OTP</button>
        
        <form onSubmit={verify} className="space-y-6">
          <input type="text" placeholder="6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)} className="w-full px-6 py-4 border border-gray-300 rounded-3xl" required />
          <button type="submit" className="w-full bg-black text-white py-6 text-xl font-semibold rounded-3xl">Verify Phone</button>
        </form>
      </div>
    </div>
  );
};

export default PhoneVerificationPage;