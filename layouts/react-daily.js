import { Component } from "react";
import Head from "next/head";
import slugify from "slugify";
import PropTypes from "prop-types";
import { MDXProvider } from "@mdx-js/tag";

import { H1, H2 } from "@sergiodxa/ui/lib/headings";
import { A } from "@sergiodxa/ui/lib/text";
import { blue, black } from "@sergiodxa/palette";
import * as CustomTypes from "@sergiodxa/types";

import components from "../components/ui/index";

import { LinkedHeader } from "../components/header";
import OpenGraph from "../components/open-graph";
import TwitterCard from "../components/twitter-card";
import * as Patreon from "../components/patreon";
import BookBanner from "../components/book-banner";
import CanonicalURL from "../components/canonical-url";
import TranslatedFrom from "../components/translated-from";
import PublishedAt from "../components/published-at";

import Main from "./main";

import minify from "../lib/minify.js";
import parseUrl from "../lib/parse-url";

class ReactDailyLayour extends Component {
  static propTypes = {
    meta: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: CustomTypes.stringMax140,
      slug: PropTypes.string,
      lang: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      canonicalUrl: PropTypes.string,
      translateFrom: PropTypes.shape({
        lang: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })
    }),
    children: PropTypes.node.isRequired
  };
  get date() {
    const { meta } = this.props;
    return new Date(meta.date);
  }
  get hostname() {
    const { meta } = this.props;
    return meta.canonicalUrl ? parseUrl(meta.canonicalUrl).hostname : "";
  }
  get url() {
    const { meta } = this.props;
    return `https://sergiodxa.com/essays/${meta.slug ||
      slugify(meta.title, { lower: true })}/`;
  }
  render() {
    const { meta, children } = this.props;

    return (
      <Main noSchema>
        <Head>
          <title>
            {meta.title} - Aprende React: Día {meta.day} de 100
          </title>
          <meta name="description" content={meta.description} />
          <meta name="twitter:widgets:theme" content="light" />
          <meta name="twitter:widgets:link-color" content={blue} />
          <meta name="twitter:widgets:border-color" content={blue} />
          {meta.canonicalUrl && (
            <link rel="canonical" href={meta.canonicalUrl} />
          )}
          {meta.translateFrom && (
            <link
              rel="alternate"
              hreflang={meta.translateFrom.lang}
              href={meta.translateFrom.url}
            />
          )}
          {/* Schema JSON */}
          <script
            id="schema"
            key="schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: minify(
                JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Article",
                  author: {
                    "@type": "Person",
                    name: "Sergio Daniel Xalambrí",
                    url: "https://sergiodxa.com"
                  },
                  inLanguage: meta.lang,
                  keywords: meta.tags.join(", "),
                  headline: meta.title,
                  url: meta.url,
                  datePublished: meta.date,
                  description: meta.description,
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": "https://sergiodxa.com"
                  }
                })
              )
            }}
          />
        </Head>

        <TwitterCard
          title={meta.title}
          url={this.url}
          description={meta.description}
        />

        <OpenGraph
          title={meta.title}
          description={meta.description}
          url={this.url}
        />

        <LinkedHeader href="/react" sticky={false} />

        <section className="content">
          <H1 className="main-title" lang={meta.lang || "en"}>
            {meta.title}
            <br />
            <small>
              Aprendiendo React <small>(día {meta.day} de 100)</small>
            </small>
          </H1>

          {meta.canonicalUrl && <CanonicalURL value={meta.canonicalUrl} />}

          {meta.translateFrom && <TranslatedFrom {...meta.translateFrom} />}

          <MDXProvider components={components}>
            <article lang={meta.lang || "en"}>{children}</article>
          </MDXProvider>

          <Patreon.After />
        </section>

        <style jsx>{`
          .content {
            font-size: 1.25rem;
            margin: 0 auto 10vh;
            max-width: 36em;
            width: 100%;
          }

          .content :global(.main-title) {
            text-align: center;
            padding-left: 0.5em;
            padding-right: 0.5em;
          }

          article {
            box-sizing: border-box;
            font-weight: normal;
            line-height: 1.4;
            outline: 0;
            padding-left: 1em;
            padding-right: 1em;
            word-break: break-word;
            word-wrap: break-word;
          }

          .content :global(h2),
          .content :global(h3),
          .content :global(h4),
          .content :global(h5),
          .content :global(h6) {
            font-weight: lighter;
            letter-spacing: -0.02em;
            margin: 1em 0 0;
            position: relative;
          }

          .content :global(h2) {
            border-bottom: 1px solid ${black};
            box-sizing: border-box;
            margin-left: calc(-1em + 2px);
            margin-right: calc(-1em + 2px);
            padding: 0 1em 0.25em;
          }

          .content :global(hr) {
            margin: 2em auto;
            width: 33%;
          }

          @media (max-width: 767px) {
            .main-title {
              font-size: 2em;
              margin-left: -2px;
              line-height: 1.04;
              letter-spacing: -0.028em;
              text-align: left;
            }

            .content :global(*:hover > .anchor::before) {
              display: none;
            }

            .content :global(h2) {
              font-size: 1.75em;
              margin-top: 1.75rem;
              box-sizing: border-box;
              padding-left: 0.5714285714em;
              padding-right: 0.5714285714em;
              margin-left: -0.5714285714em;
              margin-right: -0.5714285714em;
            }

            .content :global(h3) {
              font-size: 1.5em;
            }

            .content :global(h4) {
              font-size: 1.25em;
            }

            .content :global(h5) {
              font-size: 1.125em;
            }

            .content :global(h6) {
              font-size: 1em;
            }

            .content :global(blockquote) {
              font-size: 1.125rem;
              line-height: 1.58;
              letter-spacing: -0.004em;
              padding-left: 17px;
              margin-left: -20px;
            }

            .content :global(p) {
              font-size: 1.125rem;
              line-height: 1.58;
              letter-spacing: -0.004em;
            }

            .content :global(pre) {
              border-left: none;
              border-right: none;
              padding: 1rem 1.25rem;
              margin: 1rem -1.25rem;
            }

            .content :global(ul),
            .content :global(ol) {
              margin-left: 0;
              padding-left: 2rem;
            }

            .content :global(.embed-responsive) {
              margin: 0 -1.25rem;
            }
          }
        `}</style>
      </Main>
    );
  }
}

export default ReactDailyLayour;
