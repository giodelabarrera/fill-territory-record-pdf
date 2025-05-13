<div align="center">
<h1>fill-territory-record-pdf 🗂</h1>

<p>CLI for fill territory record form pdf</p>
</div>

---

## Usage

```bash
npx fill-territory-record-pdf [CSVFILE] --outDir <value>
```

### `CSVFILE`

- type: `String`

Territory record CSV file to read and fill pdf

```bash
# Run command and read csv from home
npx fill-territory-record-pdf ~/territory-record.csv

# Run command and read csv from current dir
npx fill-territory-record-pdf my-record.csv

# Run command and read csv from your custom path
npx fill-territory-record-pdf /my/custom/path/record.csv
```

#### CSV structure

It should have the following header fields

**Fields**

| field name    | type     | required       | description           |
| ------------- | -------- | -------------- | --------------------- |
| `territory`   | `number` | `required`     | Territory number      |
| `publisher`   | `string` | `required`     | Publisher name        |
| `started_at`  | `'yyy-mm-dd'`   | `required`     | Start date of record  |
| `finished_at` | `'yyy-mm-dd'`   |                | Finish date of record |

**Example**

`record.csv`

| **territory** | **publisher**   | **started_at** | **finished_at** |
| ------------- | --------------- | -------------- | --------------- |
| 1             | Dennis Schulist | 2018-10-11     | 2019-06-02      |
| 2             | Kurtis Weissnat | 2019-10-17     |                 |


### `--outDir`

- default: `process.cwd()` current folder of command is executed
- type: `String`

Specify an output folder for filled territory record pdf

```bash
# Run command and specify downloads folder as output for pdf
npx fill-territory-record-pdf [CSV_FILE] --outDir ~/Downloads

# Run command and specify folder as output for pdf
npx fill-territory-record-pdf [CSV_FILE] --outDir ./2022-31-08
```

### `--serviceYear`

- default: `''` 
- type: `String`

Allow to modify the service year field in the pdf

```bash
npx fill-territory-record-pdf [CSV_FILE] --outDir ~/Downloads --serviceYear '2023/2024'

npx fill-territory-record-pdf [CSV_FILE] --outDir ./2022-31-08 --serviceYear '2024/2025'
```
