import Essay from "../../layouts/essay";

import Article, {
  meta
} from "../../data/essays/ciclo-de-vida-de-un-componente-de-reactjs.mdx";

import components from "../../components/ui/index";

export default () => (
  <Essay {...meta}>
    <Article components={components} />
  </Essay>
);