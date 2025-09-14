[33mcommit 61b605ec32f604a878012f2f80733043ca9a1920[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m)[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Sep 14 22:14:34 2025 +0000

    feat: add `PATCH` on `api/v1/users/[username]` to update user

[33mcommit 2e9adadbfdfd8d3936a6f9827630a5dc8e12946c[m[33m ([m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m)[m
Merge: 71c2447 914473c
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Sep 14 17:56:06 2025 -0300

    Merge pull request #36 from leozreuter/hash-password
    
    Transform password on hash when user.create

[33mcommit 914473caac04634d440b4d6806e6a17301e0c746[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Sep 14 20:24:15 2025 +0000

    feat: implement `hashedPassord` on `user.create()`

[33mcommit a2b5ca59ea91fd0ae7c127448931164fc99d1e71[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Sep 14 20:23:24 2025 +0000

    build: add `bcryptjs`

[33mcommit 71c2447d3eca0a9cb9be19d55872cc134445b9dd[m
Merge: dfc34cb d4ffe5e
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Aug 3 22:47:56 2025 -0300

    Merge pull request #35 from leozreuter/model-users
    
    Create and List users

[33mcommit d4ffe5ed18da074debcfee1cb9739d6308edfb8e[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Aug 3 13:35:04 2025 +0000

    feat: create `user.findOneByUsername` method and use on endpoint `api/v1/users/[username]`

[33mcommit 077edb51271e9aa82f983bf87ffbb2044b331739[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Aug 3 13:33:13 2025 +0000

    feat: create `NotFoundError` and use on `controller.js`

[33mcommit 1c8ab63a9270e5d7e4d1868da84e720d08bebe27[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Aug 2 18:12:52 2025 +0000

    feat: create `user` model, `api/v1/users` endpoint and `post tests`

[33mcommit 9a8a24bea42355f64840130d9c02a9d2506e5265[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Aug 2 18:10:11 2025 +0000

    feat: create `ValidationError` and uses on controller in `onErrorHandler`

[33mcommit 566e7b65ab2f38c550d3f5bf3308fd588ce2959a[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Aug 2 18:07:59 2025 +0000

    build: install ´uuid´

[33mcommit 948c5cc0d43f138110898f413c1a875c8f314ece[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Jul 27 18:29:50 2025 +0000

    feat: create migration `create users` to new table `users`

[33mcommit e4ab28296ab23025c1688ff4af6497f71a36df2a[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Jul 27 18:27:16 2025 +0000

    feat: add `runPendingMigrations` on `orchestartor`

[33mcommit 8db65e1ed09760a5b0bb9233b7c775fc4ce6b914[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Jul 27 18:25:39 2025 +0000

    style: hide `migrations` logs

[33mcommit 8859b2dd3cf4ce6436002ae62aff00f9eee0f169[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Jul 27 17:41:03 2025 +0000

    chore: remove test migration file

[33mcommit dfc34cb145fc930d5946c380bf13e23c8790b691[m
Merge: 4d614d1 26eb512
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Jul 19 16:52:42 2025 -0300

    Merge pull request #34 from leozreuter/create-migrator-model
    
    Create model `migrator` and uses on `api/v1/migrations.js`

[33mcommit 26eb5123993c642629688d4b2691bd9c5e3aa3f8[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Jul 19 19:49:38 2025 +0000

    refactor: refactoring `migrations` controller to use `migrator` model

[33mcommit 5994f52dd0215c885cc609011248be5561464760[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Jul 19 19:47:32 2025 +0000

    feat: create `migrator` model

[33mcommit 4d614d1eba48169b30e2ef7078274ab270dff017[m
Merge: 202eb30 5adc1ba
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Jul 19 16:07:13 2025 -0300

    Merge pull request #33 from leozreuter/custom-errors
    
    Padronização dos controllers

[33mcommit 5adc1ba77b54bf0a3fe2758044382d4d75b0d82f[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Jul 19 19:01:40 2025 +0000

    test: add `not allowed methods` tests on `migrations` and `status`

[33mcommit ca2fe7d6c51804bcc9f18ef2383c574c42f4ddc2[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Jul 19 18:57:42 2025 +0000

    refactor: refactoring controllers from `migrations` and `status` to use next-connect handlers

[33mcommit 8cbe8252496fa670eb3465e2d07b1c9b025d61b3[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Jul 19 18:54:32 2025 +0000

    feat: add `controller.js` to `abstract` errors handlers for next-connect

[33mcommit 304d775390583365f7ad0553bfb9c8b8ecdbecee[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Jul 19 18:49:50 2025 +0000

    refactor: refactoring `database.js` to on errors uses and throw `ServicesError`

[33mcommit b9ac4406d2217157873a7f62f393359b75f9a534[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Jul 19 18:47:56 2025 +0000

    feat: add `MethodNotAllowedError` and `ServicesError`

[33mcommit f67cde13b36ab653c3e442bdf4c35a5921f4debc[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Jul 19 17:07:38 2025 +0000

    build: install `next-connect`

[33mcommit 202eb30b1fbac9925f2739d78d1e5b71c34a0a75[m
Merge: 14f4847 6566a86
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Jul 13 22:53:23 2025 -0300

    Merge pull request #32 from leozreuter/custom-errors
    
    `InternalServerError` implementation

[33mcommit 6566a86376f3d73e716d14d822cebc2c35389036[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Mon Jul 14 01:49:20 2025 +0000

    fix: `undefined client` with cant use `.end()`

[33mcommit 31851e30f74adee11d9429faa4877b4ccbee077c[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Mon Jul 14 01:47:21 2025 +0000

    feat: create custom `InternalServerError` and use on `/api/v1/status`

[33mcommit 14f4847ec5409a2af659947f54edbc8e30c5f11b[m
Merge: f45c8b9 6c9895a
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Thu Jul 10 23:35:32 2025 -0300

    Merge pull request #31 from leozreuter/status-page-react
    
    Adiciona versão inicial `/status`

[33mcommit 6c9895a352147f4750b85bb8634040d6b164f434[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Fri Jul 11 02:32:30 2025 +0000

    feat: add a initial `/status` page

[33mcommit 677a748cb9468a29c4c11f2f3c27d64882e04693[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Fri Jul 11 02:31:24 2025 +0000

    build: install `swr` package

[33mcommit f45c8b9dcf821be438d92c279386840ad5e99642[m
Merge: fe2998e 6d0e24d
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Apr 13 22:40:10 2025 -0300

    Merge pull request #23 from leozreuter/maintenance
    
    Maintenance: `dependecies` + `refactoring`

[33mcommit 6d0e24d49efd8887bada8992e2a5c881d16e4a5c[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Mon Apr 14 01:37:39 2025 +0000

    fix: chenge join() to resolve() in `api/v1/migrations/index.js`

[33mcommit df1c36a8d34e9060b486a5f4cc05c9d0c43d27fc[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Mon Apr 7 00:07:08 2025 +0000

    refactor: use orchestrator `clearDatabase()` in tests

[33mcommit 3ca5d51fa75b413e28e5c718a33cd22b84eafcb6[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Apr 6 23:59:23 2025 +0000

    test: rename all descriptions to use new pattern

[33mcommit a2ff6819e8367c85502da267206e50ace41dc220[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Apr 6 23:58:16 2025 +0000

    chore: add `--verbose` to `test:watch` script

[33mcommit 115d0532cab5563111765cc1b46bea6495a19b33[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Apr 6 23:13:07 2025 +0000

    feat: add `posttest` script

[33mcommit 919f2611796c9e22388f08fae4ba58dba9357749[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Apr 6 23:08:29 2025 +0000

    refactor: move `tests` script to top

[33mcommit 172772bd264e80229aa9f5a5633d6612499ea86d[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Apr 6 23:07:38 2025 +0000

    refactor: rename `migration` to `migrations`

[33mcommit 9f999f73341c3035a517957b15e5af8ae4b8701f[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Apr 6 23:06:02 2025 +0000

    refactor: rename `wait-for-postgres` script to `services:wait:database`

[33mcommit f98b3a526090da0bf8285a1df880654dcb997059[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Apr 6 21:38:19 2025 +0000

    build: update dependecies

[33mcommit b947e66c7b4dfc7a3d15e4916e1e03fe0434c6fa[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Tue Mar 25 01:31:28 2025 +0000

    build: lock dependecies versions

[33mcommit fe2998e08c6b25cbb41d9892728e0516c735d1a9[m
Merge: 633b03b 90c1987
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Mon Mar 24 22:14:18 2025 -0300

    Merge pull request #22 from leozreuter/create-license-file
    
    docs: create `LICENSE`

[33mcommit 90c198749fc3b3466fa7fb04bf173a0e73f99d12[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Mon Mar 24 22:13:09 2025 -0300

    docs: create `LICENSE`

[33mcommit 633b03ba0fff75803ee2c095f3c4cbf73706caaf[m
Merge: c9b50f4 9f4525e
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Mar 16 20:31:19 2025 -0300

    Merge pull request #21 from leozreuter/hooks
    
    add `husky` and `commitizen`

[33mcommit 9f4525e5413aa945e641c850350bcd1d1e2ce6ea[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Mar 16 23:20:02 2025 +0000

    ci: add `husky` and `commitizen` for easier committing

[33mcommit c9b50f4aec493b1ad1abb1926f3bc40fa82f50f2[m
Merge: 8722992 d80b1b4
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Mar 16 19:15:08 2025 -0300

    Merge pull request #20 from leozreuter/lint-commit
    
    add `Commit` linting

[33mcommit d80b1b41825a7e67c894d0426a40a0e8c856414b[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Mar 16 21:55:15 2025 +0000

    ci(.github/linting.yaml): add `Commit Lint` with GitHub Actions

[33mcommit 2dbfcaf1d74ac93612028f317f206dc97fe68376[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Mar 16 18:07:08 2025 +0000

    ci: add `commitlint` with `Conventional Commit` config

[33mcommit 87229920bf0c12f132d369025b4eef73952897d0[m
Merge: cb04238 322d045
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Mar 15 00:37:19 2025 -0300

    Merge pull request #19 from leozreuter/lint-quality-actions
    
    adds `lint:eslint:check` + `eslint` in `linting` GitHub Actions

[33mcommit 322d0452d82ca0e3920b4029bc5763ce67e11cdf[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Mar 15 03:36:21 2025 +0000

    fix `eslint` linting

[33mcommit ece754905ef57ae23e24a56ae0e64ab051024a36[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Mar 15 03:11:07 2025 +0000

    add `eslint` job in `linting` github actions

[33mcommit 511615a6f6d25d3e178f705d3f4f6f27259f8c4f[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Mar 15 03:09:36 2025 +0000

    adds `lint:eslint:check` script with `ESlint`

[33mcommit cb042389b5ae746e90683a5c1f3fd1edc6165d61[m
Merge: 8fd052a 8d87f94
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Mar 9 21:59:56 2025 -0300

    Merge pull request #18 from leozreuter/lint-format-actions
    
    adds `Linting` GitHub actions

[33mcommit 8d87f942ba87e5015bc9f66a2e1d389b37eca680[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Mon Mar 10 00:58:27 2025 +0000

    fix `prettier lint` files

[33mcommit be003d53b02146f6d8748eabec3e5a0c1ac83e1f[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Mon Mar 10 00:38:49 2025 +0000

    adds `Linting` GitHub actions

[33mcommit 8fd052a8f95f89695db69ee4df66503c65434379[m
Merge: 49d860d ce5016f
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Mar 9 19:56:12 2025 -0300

    Merge pull request #17 from leozreuter/actions
    
    adds `Automated Tests` with GitHub Actions

[33mcommit ce5016fb6b34083d58f55601d800e61fe477e041[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Mar 9 20:48:56 2025 +0000

    adds `Automated Tests` with GitHub Actions

[33mcommit 49d860dc02e512dde2c06d2b90305dd5a0a77a0c[m
Merge: 422a50b 892c875
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Mar 9 17:10:19 2025 -0300

    Merge pull request #15 from leozreuter/fix-npm-test
    
    make `npm test` more robust with `async-retry` and `orchestrator`

[33mcommit 892c875ba1d6e8ef53dbad30bca37d24453a11b2[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Feb 15 03:16:53 2025 +0000

    make `npm test` more robust with `async-retry` and `orchestrator`

[33mcommit 422a50b52d0b6f6c885963e8961fec74bb2dab3e[m
Merge: f878e41 fece217
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Wed Feb 12 23:03:45 2025 -0300

    Merge pull request #14 from leozreuter/wait-for-postgres
    
    add `wait-for-postgres` script and complete `npm run dev`

[33mcommit fece217f37470b5f76a0bbfe22357a80c41ff68c[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Thu Feb 13 02:00:26 2025 +0000

    add `wair-for-postgres` script and complete `npm run dev`

[33mcommit f878e41cc9759a16496b9a8937d2d4ee49bb56fc[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Feb 9 13:58:25 2025 +0000

    add counter days

[33mcommit 33e276f445bf3a3de5368f72a0778d086657a1c5[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Wed Jan 22 16:16:29 2025 +0000

    fix `\migrations` bug connection

[33mcommit ca3ff73d0d2ef0dded8f275920ceb5b22fa07995[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Dec 15 17:57:22 2024 +0000

    add `/api/v1/migrations` endpoint

[33mcommit 097598d6be20e73dc588492e8e2d93f66ec6d67f[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Mon Nov 11 13:12:40 2024 +0000

    add migrations scripts

[33mcommit 6092abbdd24a3030c06c5e6de7a8c695c41ff505[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Nov 10 17:52:02 2024 +0000

    add `getSSLValue` to make more robust `database.js`

[33mcommit 16a25a6ec02240da3dbd8ea15c03bc93aca8d19e[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Nov 3 18:51:22 2024 +0000

    makes `database.js` generete logs about erros

[33mcommit f3701dca3879fec483f16df89857851c838b4295[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Nov 2 01:44:04 2024 +0000

    update and add to the `\status` infos of postgress

[33mcommit c79ac9cb4dc6727fc57a57ca6c8907c0be16c2d7[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Nov 2 01:42:37 2024 +0000

    add `head` and `title` to page

[33mcommit b3241274b5a92fd6b23a59001cc65070522a7624[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sat Nov 2 01:41:49 2024 +0000

    add error supression to connect to db with bad query

[33mcommit 992065c013bc504b654c85665bb06056188abb1f[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Wed Oct 30 23:20:38 2024 +0000

    add scripts to run `docker services` with `next services`

[33mcommit 963276663d42a6ce285473d6679f7dd79390ef38[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Wed Oct 30 23:15:49 2024 +0000

    add `jsconfig.json` and setted `baseUrl: "."` to remove `../../../`

[33mcommit 154bf6e3564bb28b7847eb39d630b0bc5fb04fcd[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Wed Oct 30 16:00:35 2024 +0000

    mv `.env` and update `compose.yaml`

[33mcommit 915c01a39b9b9ada1f833d74863f1e382935cec6[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Tue Oct 29 03:04:44 2024 +0000

    add `pg` \\ add `database.js` module \\ add `docker`

[33mcommit 9fd73cd4b7303cb063644a619b27e3b568b6b10d[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Tue Oct 29 03:03:43 2024 +0000

    add `background-image`

[33mcommit 6414544b347d38befd3662fd447004b82621d81b[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Mon Oct 28 16:08:35 2024 +0000

    add docker `compose.yaml`

[33mcommit 57def278d02d97f8e28a6367c6cb0aad86d3b691[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Thu Oct 24 23:35:37 2024 +0000

    add `jest --watchAll`

[33mcommit 1e632ea4a674f4305d1a2b66d4c8086ebd8e4f4b[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Tue Oct 22 18:13:32 2024 +0000

    add endpoint `/status`

[33mcommit 5b0b52c88f053fcaf013468a01f250182da2d815[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Oct 20 23:37:58 2024 +0000

    add gif on `index.js`

[33mcommit f23ee175559793a37d7dbf9d510c0e5b429478cb[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Oct 20 17:12:33 2024 +0000

    aling text on `index.js`

[33mcommit 2de093c1b601aa72ce752d54b10fb3e243c03a65[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Sun Oct 20 16:08:45 2024 +0000

    install `jest` and configure jest scrpits

[33mcommit 89b0223fec89e28aa31d2b3fd65a7dcd216d5ec5[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Wed Oct 9 16:24:51 2024 +0000

    add  and fix

[33mcommit 5ca3210385ffb6abc24755747babf392a6667001[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Wed Oct 9 16:18:59 2024 +0000

    add  and  files

[33mcommit 39374245c27443ce5e22950ac67959a3eaffd8b3[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Mon Oct 7 16:23:14 2024 +0000

    add arquivo `.editorconfig`

[33mcommit 74cb6eb9534834ab7d8778290764f7a4ef5c7345[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Wed Oct 2 03:08:43 2024 +0000

    att pages index.js

[33mcommit b164ef1ed67ab969438012d3139c1394db946f2a[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Mon Sep 30 16:11:42 2024 +0000

    add pages

[33mcommit 0b9f33ca92cdda33260755858d94aa5061556125[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Mon Sep 30 16:06:04 2024 +0000

    add pages

[33mcommit 4c048abeffef1c8885bdfecb9d63ad5c459d195c[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Mon Sep 30 16:05:12 2024 +0000

    add arquivos

[33mcommit 94f09230994cc6423614e7c2d9df5e5a6a857758[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Fri Sep 27 15:57:13 2024 +0000

    add .gitignore file

[33mcommit 4b1ed4f53452d1895e4507a34e237199a9896061[m
Author: Leonardo Reuter <165732957+leozreuter@users.noreply.github.com>
Date:   Mon Sep 23 23:53:39 2024 -0300

    Initial commit
