# task

## Installation

Install my-project with npm

```bash
  npm install

```

### Program run

            npm run dev

## base url

    http://localhost:3002

## API Reference

#### Admin

Add Admin

```http
  POST /admin
```

| Parameter   | Type     | Description   |
| :---------- | :------- | :------------ |
| `FirstName` | `string` | **Required**. |
| `LastName`  | `string` | **Required**. |
| `Email`     | `string` | **Required**. |
| `Password`  | `string` | **Required**. |
| `Phone_no`  | `string` | **Required**. |
| `Address`   | `string` | **Required**. |

====================================

Admin Login

```http
  POST /admin-login
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `Email`    | `string` | **Required**. |
| `Password` | `string` | **Required**. |

tokens will be created here

==================================

Admin Can add user and User Bank account after login

token needed to be passed from header
with the key word token other wise It won't be working.

#### User

Add User

```http
  POST /user
```

| Parameter   | Type     | Description   |
| :---------- | :------- | :------------ |
| `FirstName` | `string` | **Required**. |
| `LastName`  | `string` | **Required**. |
| `Email`     | `string` | **Required**. |
| `Password`  | `string` | **Required**. |
| `Phone_no`  | `string` | **Required**. |
| `Address`   | `string` | **Required**. |

====================================

See Users

```http
  GET /user
```

All user will be printed here

========================================

See single User

```http
  GET /user/id
```

Single user will be printed here

========================================

update User

```http
  PATCH /user/id
```

| Parameter   | Type     |
| :---------- | :------- |
| `FirstName` | `string` |
| `LastName`  | `string` |
| `Email`     | `string` |
| `Password`  | `string` |
| `Phone_no`  | `string` |
| `Address`   | `string` |

User data will be updated here

========================================

Delete User

```http
  DELETE /user/id
```

User data will be updated here

========================================

#### Bank

User Id will be send here

Add User Bank

```http
  POST /bank/id
```

| Parameter    | Type     | Description   |
| :----------- | :------- | :------------ |
| `Bank_Name`  | `string` | **Required**. |
| `Branch`     | `string` | **Required**. |
| `IFSC_Code`  | `string` | **Required**. |
| `Account_No` | `string` | **Required**. |

=========================================================

Bank Id will be shared here

See User Bank

```http
  GET /user/id
```

Bank detail with user will be printed here

========================================

Bank Id will be shared here

Add User Bank

```http
  PATCH /bank/id
```

| Parameter    | Type     |
| :----------- | :------- |
| `Bank_Name`  | `string` |
| `Branch`     | `string` |
| `IFSC_Code`  | `string` |
| `Account_No` | `string` |

====================================================
Bank Id will be passed here

Delete User Bank

```http
  DELETE /bank/id
```
