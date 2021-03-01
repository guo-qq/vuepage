<template>
    <div id="app">        
        <table>
            <tr>
                <td>{{tilet.userRoleid}}</td>
                <td>{{tilet.userid}}</td>
                <td>{{tilet.roleid}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
       tilet:[]
    }
  },
  mounted () {
    this.axios.get('http://localhost:50774/Default/Get')
      .then(response => {
        this.tilet = response.data
        console.log('ok')
      })
      .catch(function (error) {
        console.log(error)
      })
  },
}
</script>