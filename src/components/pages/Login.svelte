<script lang="ts">
  import { AuthService } from "../../modules";

  import PasswordIcon from "../../svg/passwordIcon.svelte";

  let showPassword = false;
  let username = "";
  let password = "";
  let passwordType = "password";

  function togglePasswordVisibilty() {
    showPassword = !showPassword;
    passwordType = showPassword ? "text" : "password";
  }

  async function loginUser() {
    try {
      await AuthService.login(username, password);
      window.location.replace("/");
    } catch (error) {
      alert(error.message);
    }
  }

  function passwordInput(e) {
    password = e.target.value;
  }
</script>

<div
  class="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4"
>
  <div class="flex flex-col items-center justify-center">
    <div class="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10 mt-16">
      <p
        tabindex="0"
        class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800"
      >
        Login to Panel
      </p>
      <div class="mt-4">
        <label
          for="username"
          class="text-sm font-medium leading-none text-gray-800"
        >
          Username
        </label>
        <input
          id="username"
          aria-labelledby="username"
          type="text"
          bind:value={username}
          class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
        />
      </div>
      <div class="mt-6 w-full">
        <label
          for="pass"
          class="text-sm font-medium leading-none text-gray-800"
        >
          Password
        </label>
        <div class="relative flex items-center justify-center">
          <input
            id="pass"
            value={password}
            type={passwordType}
            on:input={passwordInput}
            class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
          />
          <div
            class="absolute right-0 mt-2 mr-3 cursor-pointer"
            on:click={togglePasswordVisibilty}
          >
            <PasswordIcon />
          </div>
        </div>
      </div>
      <div class="mt-8">
        <button
          on:click={loginUser}
          role="button"
          class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
          >Login</button
        >
      </div>
    </div>
  </div>
</div>
