"use client";
import VerifyUser from "@/components/auth/VerifyUser";
import React, { Suspense } from "react";

const UserfyUserAccount = () => {
  return (
    <div>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0d1117] via-[#1b2330] to-[#121826] text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-gray-300">Loading...</p>
          </div>
        </div>
      }>
        <VerifyUser />
      </Suspense>
    </div>
  );
};

export default UserfyUserAccount;

