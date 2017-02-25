using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ProgressBarApp.Startup))]
namespace ProgressBarApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
