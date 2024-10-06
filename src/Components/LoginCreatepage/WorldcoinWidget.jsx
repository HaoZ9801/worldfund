// (If using Next.js - IDKitWidget must be run on client)
"use client"
import React from "react"
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit'
import './LoginCreatePage.css';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { useNavigate } from "react-router-dom";


// Note: This must be implemented server side


// TODO: Calls your implemented server route
const WorldcoinWidget = () => {
  const navigate = useNavigate();
  const verifyProof = async (proof) => {
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ proof }),
      });
      const data = await response.json();

      console.log(data);

      if (data.verified && data.verified.success) {
        return true; // Indicate that the verification was successful
      } else {
        return false; // Indicate that the verification failed
      }
    } catch (error) {
      console.error("Verification error:", error);
    }


    //throw new Error("TODO: verify proof server route")
  };

  // TODO: Functionality after verifying
  const onSuccess = () => {
    console.log("Success")
    navigate("/mainpage")
  };

  // ...

  return (
    <IDKitWidget
      app_id="app_staging_3e043a412c6f4796590276fd65a4b4cc"
      action="login-verification"
      false
      verification_level={VerificationLevel.Device}
      handleVerify={verifyProof}
      onSuccess={onSuccess}>
      {({ open }) => (
        <>
          <VisuallyHidden>
            <DialogTitle>
              World ID Verification
            </DialogTitle>
            <DialogDescription>
              Verify your identity with World ID to proceed securely.
            </DialogDescription>
          </VisuallyHidden>
          <button
            className="login-button"
            onClick={open}
          >
            Verify with World ID
          </button>
        </>
      )}
    </IDKitWidget>
  );
};

export default WorldcoinWidget
