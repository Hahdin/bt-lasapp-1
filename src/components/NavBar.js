var React = require('react');
 var NavBar = React.createClass({
     render: function () {
         var pages = ['home', 'blog', 'pics', 'bio', 'art', 'shop', 'about', 'contacts'];
         var navLinks = pages.map(function (page) {
             return (
                 <a href={'/' + page}>
                     {page}
                 </a>
             );
         });

         return <nav>{navLinks}</nav>;
         //return <h1>here</h1>;
     }
 });
 module.exports = NavBar;
