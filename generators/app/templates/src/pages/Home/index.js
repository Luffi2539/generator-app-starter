<% if (Redux) { %>import { connect } from 'react-redux';

// view
import Home from './Home';

// selector
import homeSelector from './selector';

const mapDispatchToProps = {
  // TODO: complete actions list
};

export default connect(
  homeSelector,
  mapDispatchToProps,
)(Home);<% } else { %>
export { default } from './Home';<% } %>
