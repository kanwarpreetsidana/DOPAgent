using Microsoft.AspNetCore.SignalR;

namespace DOPAgent.Service
{
    public class ChatHub : Hub
    {

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", "No login", "No login message");



        }

        public override async Task OnConnectedAsync()
        {
            var connectionId = Context.ConnectionId;
            // You can use the connectionId as needed, e.g., store it in a list or database.
            await base.OnConnectedAsync();
        }

        public async Task SendMessageToConnectionId(string user, string message)
        {
            string connectionId = "k8u7lpfu5wZ86o9wjtrcLA";

            await Clients.Client(connectionId).SendAsync("ReceiveMessage", "No login", "No login message");
        }


    }
}
