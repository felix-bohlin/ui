import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Menu,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/react"

export default function FileManager() {
  return (
    <>
      <div
        className="file-manager ui-layout-container ui-layout-column ui-large"
        style={{ "--_max-inline-size": "80rem" }}
      >
        <div className="ui-layout-row ui-spread">
          <div className="ui-layout-column ui-x-small">
            <nav aria-label="Breadcrumb" className="files-breadcrumb">
              <ol className="ui-layout-row ui-x-small">
                <li>
                  <a className="ui-link" href="#file-manager-root">
                    My stuff
                  </a>
                </li>
                <li>
                  {" "}
                  <a className="ui-link" href="#file-manager-albums">
                    Photo albums
                  </a>
                </li>
                <li>
                  <span aria-current="page">Gig pics</span>
                </li>
              </ol>
            </nav>
            <h1 className="ui-h3">Gig pics</h1>
          </div>
          <div className="ui-layout-row ui-small">
            <Button size="small" type="button" variant="outlined">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3z"
                ></path>
              </svg>
              <span className="ui-text">New album</span>
            </Button>
            <Button size="small" type="button" variant="filled">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"
                ></path>
              </svg>
              <span className="ui-text">Upload</span>
            </Button>
          </div>
        </div>
        <div
          className="ui-layout-columns ui-large"
          style={{ "--_columns": "1fr 2fr" }}
        >
          <Card
            aria-labelledby="file-manager-storage-heading"
            as="section"
            variant="outlined"
          >
            <hgroup>
              <h2 className="ui-h5" id="file-manager-storage-heading">
                Your space
              </h2>
              <p>Shared with your bass buddies.</p>
            </hgroup>
            <CardContent>
              <p className="ui-layout-row ui-spread" id="file-manager-usage">
                <span>
                  <strong>18.4 GB</strong> of 50 GB used
                </span>
                <span>37%</span>
              </p>
              <Progress
                aria-labelledby="file-manager-usage"
                max="50"
                value="18.4"
              />
              <ul className="ui-layout-column ui-small ui-tabular-nums files-breakdown">
                <li className="ui-layout-row ui-small">
                  <span className="ui-swatch ui-info"></span>
                  <span>Tabs</span>
                  <span>0.3 GB</span>
                </li>
                <li className="ui-layout-row ui-small">
                  <span className="ui-swatch ui-success"></span>
                  <span>Photos</span>
                  <span>9.6 GB</span>
                </li>
                <li className="ui-layout-row ui-small">
                  <span className="ui-swatch ui-warning"></span>
                  <span>Videos</span>
                  <span>7.2 GB</span>
                </li>
                <li className="ui-layout-row ui-small">
                  <span className="ui-swatch ui-neutral"></span>
                  <span>Other</span>
                  <span>1.3 GB</span>
                </li>
              </ul>
            </CardContent>
            <CardActions>
              <Button size="small" type="button" variant="tonal">
                Go Gold for more space
              </Button>
            </CardActions>
          </Card>
          <section aria-labelledby="file-manager-folders-heading">
            <h2 className="ui-sr-only" id="file-manager-folders-heading">
              Folders
            </h2>
            <ul
              className="ui-layout-grid files-folders"
              style={{ "--_max-columns": "4", "--_min-inline-size": "8rem" }}
            >
              <li>
                <Card variant="outlined">
                  <hgroup>
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      style={{ "--folder": "var(--ui-info)" }}
                    >
                      <path
                        fill="currentColor"
                        d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8z"
                      ></path>
                    </svg>
                    <h3 className="ui-h6">
                      <a className="ui-card-link" href="#file-manager-selfies">
                        Backstage selfies
                      </a>
                    </h3>
                    <p>128 files, 2.1 GB</p>
                  </hgroup>
                </Card>
              </li>
              <li>
                <Card variant="outlined">
                  <hgroup>
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      style={{ "--folder": "var(--ui-warning)" }}
                    >
                      <path
                        fill="currentColor"
                        d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8z"
                      ></path>
                    </svg>
                    <h3 className="ui-h6">
                      <a
                        className="ui-card-link"
                        href="#file-manager-gig-videos"
                      >
                        Gig videos
                      </a>
                    </h3>
                    <p>64 files, 6.4 GB</p>
                  </hgroup>
                </Card>
              </li>
              <li>
                <Card variant="outlined">
                  <hgroup>
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      style={{ "--folder": "var(--ui-critical)" }}
                    >
                      <path
                        fill="currentColor"
                        d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8z"
                      ></path>
                    </svg>
                    <h3 className="ui-h6">
                      <a className="ui-card-link" href="#file-manager-tabs">
                        Tabs
                      </a>
                    </h3>
                    <p>23 files, 84 MB</p>
                  </hgroup>
                </Card>
              </li>
              <li>
                <Card variant="outlined">
                  <hgroup>
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      style={{ "--folder": "var(--ui-success)" }}
                    >
                      <path
                        fill="currentColor"
                        d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8z"
                      ></path>
                    </svg>
                    <h3 className="ui-h6">
                      <a
                        className="ui-card-link"
                        href="#file-manager-pedalboards"
                      >
                        Pedalboard pics
                      </a>
                    </h3>
                    <p>412 files, 5.6 GB</p>
                  </hgroup>
                </Card>
              </li>
            </ul>
          </section>
        </div>
        <Card
          aria-labelledby="file-manager-files-heading"
          as="section"
          variant="outlined"
        >
          <hgroup>
            <h2 className="ui-h5" id="file-manager-files-heading">
              Files
            </h2>
            <p>5 files, sorted by name.</p>
          </hgroup>
          <CardContent>
            <Table
              aria-labelledby="file-manager-files-heading"
              density="dense"
              flush
              overflow="scroll"
              tabIndex={0}
            >
              <TableHead>
                <TableRow>
                  <TableHeaderCell scope="col">
                    <Checkbox
                      hideLabel
                      label="Select all files"
                      name="file-manager-select-all"
                    />
                  </TableHeaderCell>
                  <TableHeaderCell aria-sort="ascending" scope="col">
                    <Button size="small" type="button">
                      <span className="ui-text">Name</span>
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8z"
                        ></path>
                      </svg>
                    </Button>
                  </TableHeaderCell>
                  <TableHeaderCell className="files-owner" scope="col">
                    Owner
                  </TableHeaderCell>
                  <TableHeaderCell scope="col">
                    <Button size="small" type="button">
                      Modified
                    </Button>
                  </TableHeaderCell>
                  <TableHeaderCell numeric scope="col">
                    <Button size="small" type="button">
                      Size
                    </Button>
                  </TableHeaderCell>
                  <TableHeaderCell className="files-row-action" scope="col">
                    <span className="ui-sr-only">Actions</span>
                  </TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      hideLabel
                      label="Select Drop-D-cheat-sheet.pdf"
                      name="file-manager-select"
                    />
                  </TableCell>
                  <TableCell>
                    <div
                      className="ui-layout-media ui-small files-name"
                      style={{ "--file": "var(--ui-critical)" }}
                    >
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z"
                        ></path>
                      </svg>
                      <span>Drop-D-cheat-sheet.pdf</span>
                    </div>
                  </TableCell>
                  <TableCell className="files-owner">Lou Headstock</TableCell>
                  <TableCell>6 Oct 2026</TableCell>
                  <TableCell numeric>1.2 MB</TableCell>
                  <TableCell className="files-row-action">
                    <Button
                      aria-label="Actions for Drop-D-cheat-sheet.pdf"
                      command="toggle-popover"
                      commandfor="file-manager-row-menu"
                      round
                      size="small"
                      type="button"
                    >
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M6 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4m12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                        ></path>
                      </svg>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      hideLabel
                      label="Select Gear-wishlist.xlsx"
                      name="file-manager-select"
                    />
                  </TableCell>
                  <TableCell>
                    <div
                      className="ui-layout-media ui-small files-name"
                      style={{ "--file": "var(--ui-success)" }}
                    >
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2M9 17H7v-5h2zm4 0h-2V7h2zm4 0h-2v-3h2z"
                        ></path>
                      </svg>
                      <span>Gear-wishlist.xlsx</span>
                    </div>
                  </TableCell>
                  <TableCell className="files-owner">Holly Humbucker</TableCell>
                  <TableCell>2 Oct 2026</TableCell>
                  <TableCell numeric>86 KB</TableCell>
                  <TableCell className="files-row-action">
                    <Button
                      aria-label="Actions for Gear-wishlist.xlsx"
                      command="toggle-popover"
                      commandfor="file-manager-row-menu"
                      round
                      size="small"
                      type="button"
                    >
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M6 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4m12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                        ></path>
                      </svg>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      hideLabel
                      label="Select Low-B-glamour-shot.png"
                      name="file-manager-select"
                    />
                  </TableCell>
                  <TableCell>
                    <div
                      className="ui-layout-media ui-small files-name"
                      style={{ "--file": "var(--ui-info)" }}
                    >
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2M8.5 13.5l2.5 3.01L14.5 12l4.5 6H5z"
                        ></path>
                      </svg>
                      <span>Low-B-glamour-shot.png</span>
                    </div>
                  </TableCell>
                  <TableCell className="files-owner">Percy Groove</TableCell>
                  <TableCell>29 Sep 2026</TableCell>
                  <TableCell numeric>3.4 MB</TableCell>
                  <TableCell className="files-row-action">
                    <Button
                      aria-label="Actions for Low-B-glamour-shot.png"
                      command="toggle-popover"
                      commandfor="file-manager-row-menu"
                      round
                      size="small"
                      type="button"
                    >
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M6 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4m12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                        ></path>
                      </svg>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      hideLabel
                      label="Select Slap-solo-take-7.mp4"
                      name="file-manager-select"
                    />
                  </TableCell>
                  <TableCell>
                    <div
                      className="ui-layout-media ui-small files-name"
                      style={{ "--file": "var(--ui-warning)" }}
                    >
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4z"
                        ></path>
                      </svg>
                      <span>Slap-solo-take-7.mp4</span>
                    </div>
                  </TableCell>
                  <TableCell className="files-owner">Lou Headstock</TableCell>
                  <TableCell>24 Sep 2026</TableCell>
                  <TableCell numeric>248 MB</TableCell>
                  <TableCell className="files-row-action">
                    <Button
                      aria-label="Actions for Slap-solo-take-7.mp4"
                      command="toggle-popover"
                      commandfor="file-manager-row-menu"
                      round
                      size="small"
                      type="button"
                    >
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M6 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4m12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                        ></path>
                      </svg>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      hideLabel
                      label="Select Why-bass-matters.docx"
                      name="file-manager-select"
                    />
                  </TableCell>
                  <TableCell>
                    <div
                      className="ui-layout-media ui-small files-name"
                      style={{ "--file": "var(--ui-info)" }}
                    >
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z"
                        ></path>
                      </svg>
                      <span>Why-bass-matters.docx</span>
                    </div>
                  </TableCell>
                  <TableCell className="files-owner">Stella Nut</TableCell>
                  <TableCell>18 Sep 2026</TableCell>
                  <TableCell numeric>42 KB</TableCell>
                  <TableCell className="files-row-action">
                    <Button
                      aria-label="Actions for Why-bass-matters.docx"
                      command="toggle-popover"
                      commandfor="file-manager-row-menu"
                      round
                      size="small"
                      type="button"
                    >
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M6 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4m12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                        ></path>
                      </svg>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Menu
              align="end"
              id="file-manager-row-menu"
              items={[
                { label: "Download" },
                { label: "Rename", shortcut: "F2" },
                { label: "Share" },
                { borderTop: true, color: "critical", label: "Move to trash" },
              ]}
            />
          </CardContent>
        </Card>
      </div>
      <style>{`
        .file-manager {
          container-type: inline-size;

          .files-breadcrumb ol {
            font-size: var(--ui-font-size-caption);

            li + li::before {
              color: var(--ui-text);
              content: "/";
              margin-inline-end: var(--ui-space-1);
            }
          }

          .files-breakdown li > span:last-child {
            margin-inline-start: auto;
          }

          .files-folders {
            hgroup > svg {
              color: var(--folder);
              margin-block-end: var(--ui-space-1);
            }
          }

          .ui-table th:has(.ui-button) {
            padding-block: 0;
            padding-inline-start: var(--ui-space-1);
          }

          .files-name svg {
            color: var(--file);
          }

          .files-owner {
            display: none;

            @container (inline-size >= 40rem) {
              display: table-cell;
            }
          }

          .files-row-action {
            text-align: end;
          }
        }
      `}</style>
    </>
  )
}
