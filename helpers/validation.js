export const loginValidation = ({ username, password }) => {
  console.log("[Validation] Perform Login Validation");

  if (!username) {
    msgs.push("Username is required");
    console.log("[Validation] Username is required");
  } else if (!validator.isLength(username, { min: 5 })) {
    msgs.push("Username should be at least 5 characters");
    console.log("[Validation] Invaild character (a-z, A-Z, 0-9, _ . -) only");
  }

  if (!password) {
    msgs.push({ msg: "Password Field is required", class: "alert-danger" });
    console.log("[Validation] Password Field is required");

    sharedData.password.invalid = true;
  } else if (!validator.isLength(password, { min: 6, max: 15 })) {
    msgs.push("Password should be 6-15 characters");
    console.log("[Validation] Password should be 6-15 characters");
  }

  let isValid = msgs.length === 0;
  return isValid;
};

export const signupValidation = ({ username, password, repeatPassword }) => {
  console.log("[Validation] Perform Signup Validation");

  loginValidation({ username, password, repeatPassword });

  if (!repeatPassword) {
    msgs.push({
      msg: "Confirmed Password Field is required",
    });
    console.log("[Validation] Confirmed Password Field is required");
  } else if (!validator.equals(password, repeatPassword)) {
    msgs.push("Password not matching");
    console.log("[Validation] Password not matching");
  }
  return isValid;
};
