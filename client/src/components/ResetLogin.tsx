import React from 'react'

const ResetLogin = () => {
  const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/login";
    const email: HTMLInputElement | null = document.querySelector(
      'input[name="email"]'
    );
    const username: HTMLInputElement | null = document.querySelector(
      'input[name="username"]'
    );

    e.preventDefault();

    await axios
      .post(
        url,
        { username: username!.value, email: email!.value },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success) {
          redirect("/");
        }
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response &&
          err.response.status == 400 &&
          err.response.data == "Username not found"
        ) {
          username!.setCustomValidity("Username not found");
          username!.reportValidity();
          return;
        }
        if (
          err.response &&
          err.response.status == 400 &&
          err.response.data == "Email not found"
        ) {
          email!.setCustomValidity("Incorrect password");
          email!.reportValidity();
          return;
        }
      });
  };

  // const {isLoggedIn, user} = useLoggedInStatus();
  const isLoggedIn = false;

  if (isLoggedIn) {
    return (
      <div className="fw-bold h-screen pt-32 text-center text-5xl">
        <h1>You are already logged in!</h1>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col bg-gray-100">
        <div className="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
          <div className="w-full rounded bg-white px-6 py-8 text-black shadow-md">
            <h1 className="mb-8 text-center text-3xl font-bold">Reset Password</h1>

            <input
              type="email"
              className="border-grey-light mb-4 block w-full rounded border p-3"
              name="email"
              placeholder="Email"
              minLength={3}
              maxLength={25}
              required
              onChange={() => {
                (
                  document.querySelector(
                    'input[name="email"]'
                  ) as HTMLFormElement
                ).setCustomValidity("");
              }}
            />
            <input
              type="text"
              className="border-grey-light mb-4 block w-full rounded border p-3"
              name="username"
              placeholder="Username"
              minLength={3}
              maxLength={15}
              required
              onChange={() => {
                (document.querySelector(
                  'input[name="username"]'
                ) as HTMLInputElement)!.setCustomValidity("");
              }}
            />

            <button
              type="submit"
              formMethod="post"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                (document.querySelector(
                  'input[name="username"]'
                ) as HTMLInputElement)!.setCustomValidity("");
                submitForm(e);
              }}
              className="hover:bg-green-dark mt-5 w-full rounded bg-red-500 py-3 text-center text-white hover:bg-red-600"
            >
                Reset Password
            </button>

          </div>

        </div>
      </div>
    );
  }
}

export default ResetLogin