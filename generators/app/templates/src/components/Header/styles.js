export default function() {
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
    },<% if(I18) { %>
    languagesRoot: {
      display: 'flex',
      alignItems: 'center',

      '& > *': {
        marginRight: 10,
      },
    },<% } %>
  };
}
