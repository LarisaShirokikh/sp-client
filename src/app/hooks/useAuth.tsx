"use client";
import { useContext } from "react";
import { AuthContextType } from "../interface/auth";
import { AuthContext } from "../providers/AuthProvider";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export default useAuth;