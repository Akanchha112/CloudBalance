import React, { useState } from "react";
import IamRoleCreation from "./component/IamRoleCreation";
import OnboardingButton from "./component/OnboardingButton";
import PolicyManagement from "./component/PolicyManagement";
import CUR from "./component/CUR";
// import useAccountCreation from "../../api/onboarding/useAccountCreation";
import { useNavigate } from "react-router";
// import Loading from "../../component/loading/Loading";
import { toast } from "react-toastify";
import { createAccount } from "../../utils/AccountApiUtil";

const Onboarding = () => {
  const [page, setPage] = useState(1);
  // const {loading, createAccount} = useAccountCreation();
  const[account, setAccount] = useState({});
  const navigate = useNavigate();

  const changePage = (e) => {
    const { name } = e.target;

    if (name === "next") {
      // validation for page 1
      if (page === 1) {
        if (!account?.arn || !account?.id || !account?.name) {
          toast.error("Please fill all required fields before proceeding");
          return;
        }
      }
      setPage((p) => p + 1);
    }

    if (name === "prev") {
      setPage((p) => p - 1);
    }
  };

  const handleSubmit = async() => {
      console.log("account",account);
      
      const response = await createAccount({
        accountId: account.id,
        accountName: account.name,
        arn: account.arn,
      });

     if (response.success) {
        toast.success("Account created successfully!");
        navigate("/app/users");
      } else {
        // Show backend error message to the user
        toast.error(response.message || "Failed to create account");
        console.error("Error creating account:", response);
      }
  };

  // if(loading){
  //   return(
  //     <>
  //       <Loading />
  //     </>
  //   )
  // }

  return (
  <>
    <div className="onboarding">
      {page === 1 && (
        <IamRoleCreation account={account} setAccount={setAccount} />
      )}
      {page === 2 && <PolicyManagement />}
      {page === 3 && <CUR />}

      <div className="onboarding__footer">
        <OnboardingButton
          label={"Prev"}
          disabled={page === 1}
          name={"prev"}
          clickFunction={changePage}
        />

        {page !== 3 && (
          <OnboardingButton
            label={"Next"}
            name={"next"}
            clickFunction={changePage}
          />
        )}

        {page === 3 && (
          <OnboardingButton
            label={"Submit"}
            name={"submit"}
            clickFunction={handleSubmit}
          />
        )}
      </div>
    </div>
  </>
);

};

export default Onboarding;
