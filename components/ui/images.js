import { Fragment } from "react";

import * as colors from "../../lib/colors";

export function Image(props) {
  return (
    <Fragment>
      <img {...props} />
      <style jsx>{`
        img {
          max-width: 100%;
          vertical-align: top;
        }
      `}</style>
    </Fragment>
  );
}

export function Figure({ children, ...props }) {
  return (
    <figure {...props}>
      {children}
      <style jsx>{`
        figure {
          font-size: 0;
          text-align: center;
          margin: 0;
          width: 100%;
        }
      `}</style>
    </figure>
  );
}

export function FigCaption({ children, ...props }) {
  return (
    <figcaption {...props}>
      {children}
      <style jsx>{`
        figcaption {
          color: ${colors.grey};
          font-size: 0.9rem;
        }
      `}</style>
    </figcaption>
  );
}
