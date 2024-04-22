
class ActiveTab {
  constructor(activeTab = '') {
    this.activeTab = activeTab;
    this.subscribers = [];
  }

  setActiveTab(tab) {
    this.activeTab = tab;
    this.notifySubscribers();
  }

  getActiveTab() {
    return this.activeTab;
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

    notifySubscribers() {
        this.subscribers.forEach((callback) => {
        callback();
        });
    }
}

export default ActiveTab;