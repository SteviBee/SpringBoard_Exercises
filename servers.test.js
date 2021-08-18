describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';

  });

  // Example 
  it('should add a new server to allServers on submitServerInfo()', function () {
    // calls the function we are testing
    submitServerInfo();

    // we added one server before so tests it is there & is alice
    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  // Check no new server if empty, check 
  it('should check no new server if empty, checks on submitServerInfo()', function () {
    // Sets serverNameInput.value to empty and then runs our function and checks it stays empty
    serverNameInput.value = "";
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(0);

  });

  // Testing updatedServerTable function html
  it("should check the table was updated correctly for updateServerTable", function () {
    // invokes submit fn then update fn and ensure we get some values
    submitServerInfo();
    updateServerTable()
    
    expect(serverTbody.innerHTML).toContain("$0.00");
    expect(serverTbody.innerHTML).toContain("id");
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  })

  afterEach(function() {
    // teardown logic - make all inputs set to zero or empty
    serverNameInput.value = '';
    serverId = 0;
    serverTbody.innerHTML = '';
    allServers = {};
  });
});
