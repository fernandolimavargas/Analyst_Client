import React, { Fragment } from 'react';

const Button = (props) => {
  const { name, icon, submit, disabled, nroIssue, dataTarget, dataDismiss } = props;

  return (
    <Fragment>
      {disabled ? (
        <button className="buttons" disabled>
          {icon} {name}
        </button>
      ) : (
        <Fragment>
          {nroIssue ? (
            <Fragment>
              <button className="buttons">
                <a
                  href={`https://jira.linx.com.br/browse/AUTO-${nroIssue}`}
                  target="_blank"
                  style={{ fontSize: 16, color: '#a235b5' }}
                >
                  {icon} {name}
                </a>
              </button>
            </Fragment>
          ) : (
            <Fragment>
              {dataTarget ? (
                <button
                  className="buttons"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target={dataTarget}
                  onClick={submit}
                >
                  {icon} {name}
                </button>
              ) : (
                <button className="buttons" onClick={submit} data-bs-dismiss={dataDismiss}>
                  {icon} {name}
                </button>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Button;
