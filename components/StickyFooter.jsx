import React from 'react';

class StickyFooter extends React.Component {
  render () {
    return  <footer className="footer">
      <div className="container">
        <p className="text-muted">
          Made with <a href='http://larrywu.com'>code</a>.
        </p>
      </div>
    </footer>
  }
}

export default StickyFooter;
