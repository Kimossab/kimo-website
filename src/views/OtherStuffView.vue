<template>
  <div class="w-full px-content-padding mx-auto h-full about overflow-y-auto">
    <div class="mb-4 mt-2 flex flex-col gap-4">
      <h1>Other Stuff</h1>

      <div class="flex gap-4">
        <router-link class="h-40 w-1/2" to="/amq">
          <button
            class="h-full w-full bg-slate-800 bg-opacity-40 transition hover:scale-105 border border-solid border-slate-950 drop-shadow-lg rounded-2xl cursor-pointer overflow-hidden no-select"
          >
            <div class="absolute top-0 left-0 w-full h-full opacity-50">
              <img
                src="@/assets/amq.png"
                alt="AMQ"
                class="w-full h-full object-cover no-select"
              />
            </div>
            <div class="text-3xl dark:mix-blend-plus-lighter mix-blend-darken">
              AMQ Tournaments
            </div>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
