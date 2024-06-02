using System.ComponentModel;
using System.Text.Json.Serialization;

namespace API.Entities.Enum
{
    [JsonConverter(typeof(EnumConverter))]
    public enum Condition
    {
        New ,
        Like_New,
        Used,
        Damaged
    }
}